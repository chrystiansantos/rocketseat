import React from 'react'
import { Image } from 'react-native'
import { theme } from '../../global/styles/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles'

interface IAvatarProps {
  urlImage: string
}

export function Avatar({ urlImage }: IAvatarProps) {
  const { secondary80 } = theme.colors;

  return (
    <LinearGradient style={styles.container} colors={['black', secondary80]}>
      <Image style={styles.image} source={{ uri: urlImage }}></Image>
    </LinearGradient>
  )
}
