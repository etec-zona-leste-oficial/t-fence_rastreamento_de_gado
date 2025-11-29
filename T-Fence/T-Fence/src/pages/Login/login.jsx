import { loginUser } from "../../services/userService";
import { AuthContext } from '../../context/AuthContext';
import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import style from "./style";
import IconPadlock from '../../assets/icons/IconPadlock.png'
import { themes } from '../../global/themes'
import { MaterialIcons } from '@expo/vector-icons'

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("InputEmpaty");
      return;
    }
    try {
      setIsLoading(true)
      await login(email, password);
    } catch (error) {
      setErrorMessage("loginFailed");
      Alert.alert("Erro no Cadastro", error.error || "Ocorreu um erro, tente novamente.");
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -180} // ajuste se precisar
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={style.container}>
          <View>
            <View style={style.boxTop}>
              <Image
                source={IconPadlock}
                style={style.imgPadlock}
                resizeMode="contain"
              />
              <Text style={style.text}>Entrar</Text>
              <Text style={style.textDescription}>
                Acesse sua fazenda digital e acompanhe seus animais com segurança e praticidade.
              </Text>
            </View>

            <View style={style.boxCenter}>
              <View style={style.inputBox}>
                <TextInput
                  placeholderTextColor={themes.colors.lightGreen}
                  style={style.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={style.inputBox}>
                <TextInput
                  placeholderTextColor={themes.colors.lightGreen}
                  style={style.input}
                  placeholder="Senha"
                  secureTextEntry={passwordHidden}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setPasswordHidden(!passwordHidden)}
                >
                  <MaterialIcons
                    name={passwordHidden ? "visibility-off" : "visibility"}
                    size={20}
                    color={themes.colors.green}
                  />
                </TouchableOpacity>
              </View>

              {errorMessage === "loginFailed" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                  Email ou senha inválidos!
                </Text>
              ) : errorMessage === "InputEmpaty" ? (
                <Text style={{ marginLeft: 3, color: themes.colors.red, fontFamily: 'Poppins' }}>
                  Preencha todos os campos!
                </Text>
              ) : null}

              <Text style={[style.forgotPassword, { color: themes.colors.green }]}>
                Esqueceu sua senha?
              </Text>

              <TouchableOpacity onPress={handleLogin} style={style.loginButton}>
                <Text style={style.textButton}>
                  {isLoading ? <ActivityIndicator size="30" color="#fff" /> : "Entrar"}
                </Text>
              </TouchableOpacity>

              <Text style={style.textLogout}>
                Não tem uma conta?{" "}
                <Text onPress={() => navigation.navigate('SingUp')} style={{ color: themes.colors.green }}>
                  Cadastre-se
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
}
