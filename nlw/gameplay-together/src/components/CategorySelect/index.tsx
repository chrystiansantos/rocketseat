import React from 'react'
import { ScrollView } from 'react-native'

import { categories } from '../../utils/categories'
import { styles } from './styles'

import { Category } from '../Category'

interface ICategorySelectProps {
  categorySelected: string;
  setCategory: (categoryId: string) => void;
  hasCheckBox?: boolean
}

export function CategorySelect({ categorySelected, setCategory, hasCheckBox = false }: ICategorySelectProps) {

  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40 }}
    >
      {
        categories.map(category => (
          <Category key={category.id} title={category.title} icon={category.icon}
            hasCheckBox={hasCheckBox}
            checked={category.id === categorySelected}
            onPress={() => setCategory(category.id)}
          />
        ))
      }
    </ScrollView>
  )
}
