import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../../global/styles/theme'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

interface IHeaderProps {
  title: string;
  action?: ReactNode
}
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'

export function Header({ title, action }: IHeaderProps) {
  const { goBack } = useNavigation()
  const { secondary100, secondary40, heading } = theme.colors;

  const handleGoBack = () => {
    goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton onPress={handleGoBack}>
        <Feather name="arrow-left"
          size={24}
          color={heading}
        />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      {
        action ? <View >{action}</View> : <View style={{ width: 24 }}></View>
      }
    </LinearGradient>

  )
}
