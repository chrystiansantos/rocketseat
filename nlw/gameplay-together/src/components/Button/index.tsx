import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import { styles } from './styles'

interface IButtonProps extends RectButtonProps {
  title: string
}

export const Button = ({ title, ...rest }: IButtonProps) => {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        {title}
      </Text>
    </RectButton>
  )
}