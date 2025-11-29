import React from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList, Animated } from 'react-native'
import { useState, useContext, useEffect, useRef } from "react";
import style from './Style'
import { themes } from '../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'
import { AuthContext } from '../../context/AuthContext';
import NotificationsIcon from '../../assets/icons/notificationsIcon.png'
import NotificationCard from '../notification-card/notificationCard';
import CloseIcon from '../../assets/icons/close.png'
import { findAlerts } from '../../services/alertService';

export default function notifications({ clickMarker }) {
  const { propertyInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [createScreen, SetCreateScreen] = useState(false);
  const [alerts, setAlerts] = useState([])

  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale, opacity]);

  const animatedPulseStyle = {
    transform: [
      {
        scale: scale,
      },
    ],
    opacity: opacity,
  };

  const fetchAlerts = async () => {
    if (!propertyInfo?._id) {
      return;
    }
    try {
      setIsLoading(true);
      const foundAlerts = await findAlerts(propertyInfo._id);
      setAlerts(foundAlerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, [createScreen])

  return (
    <>
      
      <TouchableOpacity onPress={() => { createScreen ? SetCreateScreen(false) : SetCreateScreen(true) }} style={style.CreateButton}
        activeOpacity={0.6}
      >
        {false && <Animated.View style={[style.pulse, animatedPulseStyle]} />}
        <Image
          source={NotificationsIcon}
          resizeMode="contain"
          style={{ width: 25, height: 25, zIndex: 2, }}
        />
      </TouchableOpacity>


      {createScreen &&
        <View style={[style.FullyScreen]}>

          <View style={style.notificationsScreen}>
            <View style={style.headerNotifications}>
              <Text style={style.titleScreen}>
                {"Notificações"}
              </Text>

              <TouchableOpacity
                onPress={() => { SetCreateScreen(false) }}
              >
                <Image
                  source={CloseIcon}
                  style={[style.icon, { width: 30, height: 30 }]}
                />
              </TouchableOpacity>
            </View>

            {alerts.length > 0 ? (
              <FlatList
                data={alerts}
                keyExtractor={(item) => item._id}
                initialNumToRender={5}
                windowSize={10}
                removeClippedSubviews={true}
                renderItem={({ item, index }) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  const dateCard = new Date(item.timestamp);
                  dateCard.setHours(0, 0, 0, 0);

                  const diffMs = today.getTime() - dateCard.getTime();
                  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

                  let dateLabel = "";
                  if (diffDays === 0) dateLabel = "Hoje";
                  else if (diffDays === 1) dateLabel = "Ontem";
                  else if (diffDays > 1 && diffDays <= 7) dateLabel = `Há ${diffDays} dias`;
                  else dateLabel = dateCard.toLocaleDateString('pt-BR');

                  const prevItem = alerts[index - 1];
                  let showLabel = true;
                  if (prevItem) {
                    const prevDate = new Date(prevItem.timestamp);
                    prevDate.setHours(0, 0, 0, 0);
                    if (prevDate.getTime() === dateCard.getTime()) {
                      showLabel = false;
                    }
                  }

                  return (
                    <View style={style.ListAlert}>
                      {showLabel && (
                        <Text style={{ fontFamily: "Poppins-Medium", marginBottom: -5, marginTop: 8 }}>
                          {dateLabel}
                        </Text>
                      )}

                      <NotificationCard
                        nameAnimal={item.name_animal}
                        nameCollar={item.name_collar}
                        resolved={item.resolved}
                        type={item.type}
                        date={item.timestamp}
                        onPress={() => {SetCreateScreen(false), clickMarker(item.collar_id)}}
                      />
                    </View>
                  );
                }}
              />

            ) :
              isLoading ?
                (<ActivityIndicator size="30" color={themes.colors.green} />)
                : (<Text style={[{ fontFamily: "Poppins-Medium" }, { textAlign: "center" }, { marginTop: 12 }]}>Nenhuma notificação encontrada</Text>)
            }
          </View>

        </View>
      }
    </>
  )
}