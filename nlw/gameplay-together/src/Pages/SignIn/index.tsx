import React from 'react'
import { View, Image, Text, Alert, ActivityIndicator } from 'react-native'
import { style } from './style'

import ilustratorImg from '../../assets/illustration.png';
import { Background } from '../../components/Background'
import { ButtonIcon } from '../../components/ButtonIcon'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function SignIn() {

  const { user, loading, signIn } = useAuth();
  const { navigate } = useNavigation();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error)
    }
  }

  return (
    <Background>
      <View style={style.container}>
        <Image style={style.image} resizeMode="stretch" source={ilustratorImg} />
        <View style={style.content}>
          <Text style={style.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas {'\n'}
          </Text>
          <Text style={style.subtitle}>
            Crie grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>
          {loading ? <ActivityIndicator color={theme.colors.primary} /> : <ButtonIcon onPress={handleSignIn} title="Entrar com Discord" />}
        </View>
      </View>
    </Background>
  )
}