import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginUser, registerUser, selectUser, verifyUserType } from '../services/userService';
import { findPropertyById } from '../services/PropertyService';
import { registerProperty, findCollaborator } from '../services/PropertyService';


// 1. Cria o contexto
export const AuthContext = createContext();

// 2. Cria o Provedor do Contexto
export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [requestCollaborate, setRequestCollaborate] = useState(null);
    const [role, setRole] = useState(null);
    const [notificationToken, setNotificationToken] = useState();
    const [userInfo, setUserInfo] = useState(null);
    const [propertyInfo, setPropertyInfo] = useState(null);

    // FUNÇÃO DE LOGIN:
    const login = async (email, password) => {
        try {
            // Chama a função do seu userService
            const data = await loginUser(email, password, notificationToken);
            setIsLoading(true);
            // A resposta do baakend
            setUserInfo(data.user);
            setUserToken(data.token);
            setPropertyInfo(data.property);

            // AQUI GUARDA O TOKEN E OS DADOS DO USUÁRIO
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(data.user)); // Guardamos como string
            await AsyncStorage.setItem('propertyInfo', JSON.stringify(data.property));


            // SETANDO O TIPO DE USUARIO

            const userType = await verifyUserType(data.user._id)
            if (userType.count === 0) {
                console.log("Usuário não tem propriedades — role = none");
            } else {
                userType.properties.forEach((prop) => {
                    setRole(prop.role)
                });
            }
            await AsyncStorage.setItem('role', JSON.stringify(role));

        } catch (error) {
            // console.error('Erro no login:', error);
            // Propaga o erro para a tela poder mostrar um alerta
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // FUNÇÃO DE CADASTRO
    const register = async (email, password, firstName, surname, notification_token, phoneNumber) => {
        setIsLoading(true);
        try {
            const data = await registerUser(email, password, firstName, surname, notification_token, phoneNumber);

            setUserInfo(data.user);
            setUserToken(data.token);

            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));

        } catch (error) {
            console.error('Erro no registro:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const registerPropertyAuth = async (user_id, nameProperty, uf, city, address, area, location, description) => {

        setIsLoading(true);
        try {
            setIsLoading(true)
            const data = await registerProperty(user_id, nameProperty, uf, city, address, area, location, description)
            console.log("Resposta do backend:", data);
            setPropertyInfo(data);

            if (data) {
                await AsyncStorage.setItem('propertyInfo', JSON.stringify(data));
            } else {
                console.log("Nenhum dado recebido do backend");
            }

        } catch (err) {
            console.log("Erro ao cadastrar:", err.response?.data || err.message);
            console.log("Erro completo:", err);

            if (err.response) {
                console.log("Erro do servidor:", err.response.data);
                Alert.alert("Erro", err.response.data.error || "Erro no servidor.");
            }
        } finally {
            setIsLoading(false)
        }
    };

    const completCollaborator = async (user_id) => {

        try {

            const data = await findCollaborator(user_id)
            if (data.exists) {
                setIsLoading(true)
                console.log("Resposta do backend:", data);
                setPropertyInfo(data.property);

                if (data) {
                    await AsyncStorage.setItem('propertyInfo', JSON.stringify(data.property));
                } else {
                    console.log("Nenhum dado recebido do backend");
                }
            }
        } catch (err) {
            console.log("Erro completo:", err);
            if (err.response) {
                console.log("Erro do servidor:", err.response.data);
                Alert.alert("Erro", err.response.data.error || "Erro no servidor.");
            }
        } finally {
            setIsLoading(false)
        }
    };

    const saveNotificationToken = async (notificationToken) => {
        setIsLoading(true);

        setNotificationToken(notificationToken)
        await AsyncStorage.setItem('notificationToken', notificationToken);

        setIsLoading(false);
    };

    const fetchUser = async (_id) => {
        const data = await selectUser(_id)
        setUserInfo(data.user);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
    };

    const fetchProperty = async (_id) => {  
        const data = await findPropertyById(_id);
        setPropertyInfo(data.property);
        console.log(data);
        await AsyncStorage.setItem('propertyInfo', JSON.stringify(data.property));
    };

    const registerCollaborator = async (_id) => {
        const data = await selectUser(_id)
        setUserInfo(data.user);
        await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
    };

    // FUNÇÃO DE LOGOUT
    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        setPropertyInfo(null);
        setRequestCollaborate(null);
        setRole(null);

        // Limpa o armazenamento
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('propertyInfo');
        await AsyncStorage.removeItem('propertyInfo');
        await AsyncStorage.removeItem('requestCollaborate');
        await AsyncStorage.removeItem('role');
        setIsLoading(false);
    };

    const setStatusRequestCollaborate = async (type) => {
        console.log("Resquest is: " + requestCollaborate)
        setIsLoading(true);
        setRequestCollaborate(type);
        await AsyncStorage.setItem('requestCollaborate', JSON.stringify(type));
        setIsLoading(false);
    };

    // Função para verificar se já existe um token ao abrir o app
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            const requestCollaborate = await AsyncStorage.getItem('requestCollaborate');
            const token = await AsyncStorage.getItem('userToken');
            const user = await AsyncStorage.getItem('userInfo');
            const property = await AsyncStorage.getItem('propertyInfo');
            const parsedUser = JSON.parse(user);
            if (token) {
                setUserToken(token);
                setUserInfo(JSON.parse(user));
                setRequestCollaborate(JSON.parse(requestCollaborate));
                if (property) {
                    setPropertyInfo(JSON.parse(property));
                }
            }
            if (!token || !user) {
                setIsLoading(false);
                return;
            }
            const userType = await verifyUserType(parsedUser._id)
            if (userType.count === 0) {
                console.log("Usuário não tem propriedades — role = none");
            } else {
                userType.properties.forEach((prop) => {
                    setRole(prop.role)
                });
            }
            await AsyncStorage.setItem('role', JSON.stringify(role));

            const data = await selectUser(parsedUser._id)
            setUserInfo(data.user);
            await AsyncStorage.setItem('userInfo', JSON.stringify(data.user));
        } catch (e) {
            console.error('Erro ao verificar login:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, register, registerPropertyAuth, saveNotificationToken, fetchUser, fetchProperty, completCollaborator, setStatusRequestCollaborate, isLoading, userToken, userInfo, propertyInfo, notificationToken, role, requestCollaborate }}>
            {children}
        </AuthContext.Provider>
    );
};