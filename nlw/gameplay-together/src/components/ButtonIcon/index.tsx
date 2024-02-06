import React from 'react'
import { Text, Image, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import DiscordImg from '../../assets/discord.png';

import { styles } from './styles'

interface IButtonIcon extends RectButtonProps {
  title: string;
}

export function ButtonIcon({ title, ...rest }: IButtonIcon) {
  return (
    <RectButton style={styles.cotainer} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImg} style={styles.icon}></Image>
      </View>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  )
}