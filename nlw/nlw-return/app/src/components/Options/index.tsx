import React from 'react'
import { Text, View } from 'react-native'
import { feedbackTypes } from '../../utils/feedbackTypes'

import { Copyrights } from '../Copyrights'
import { Option } from '../Option'
import { IFeedbackType } from '../Widget'
import { styles } from './styles'

interface IOptionProps {
  onFeedbackTypeChanged: (data: IFeedbackType) => void
}

export function Options({ onFeedbackTypeChanged }: IOptionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deixe o seu feedback</Text>
      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => (
            <Option
              key={key}
              image={value.image}
              title={value.title}
              onPress={() => onFeedbackTypeChanged(key as IFeedbackType)}
            />
          ))
        }
      </View>

      <Copyrights />

    </View>
  )
}

