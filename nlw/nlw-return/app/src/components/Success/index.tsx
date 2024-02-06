import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import successImg from '../../assets/success.png'
import { Copyrights } from '../Copyrights';

import { styles } from './styles';

interface ISuccessProps {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: ISuccessProps) {
  return (
    <View style={styles.container}>
      <Image
        source={successImg}
        style={styles.image}
      />

      <Text style={styles.title}>Agradecemos o feedback</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonTitle}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>

      <Copyrights />
    </View>
  );
}