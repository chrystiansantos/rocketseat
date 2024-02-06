import React from 'react'
import { View, TextInput, TextInputProps } from 'react-native'
import { styles } from './styles'

export const TextArea = ({ ...rest }: TextInputProps) => {
  return (
    <TextInput
      style={styles.container}
      {...rest}
    />
  )
}