import { Link } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cart-store'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

export default function Home() {
  const { products } = useCartStore()
  const sectionListRef = useRef<SectionList<ProductProps>>(null)
  const [category, setCategory] = useState<string>(CATEGORIES[0])
  const cartQuantityItems = products.reduce(
    (total, products) => total + products.quantity,
    0,
  )

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory,
    )

    sectionListRef?.current?.scrollToLocation({
      animated: true,
      sectionIndex,
      itemIndex: 0,
    })
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
