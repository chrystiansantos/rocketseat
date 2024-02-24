import { Feather } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useState } from 'react'
import { Alert, Linking, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { LinkButton } from '@/components/link-button'
import { Product } from '@/components/product'
import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/format-currenci'

const PHONE_NUMBER = '5537991162034'

export default function Cart() {
  const { products, remove, clear } = useCartStore()
  const { goBack } = useNavigation()
  const [address, setAddress] = useState('')

  const total = formatCurrency(
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ),
  )

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remover', `Deseja remover ${product.title} do carrinho ?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => remove(product.id),
      },
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert('Pedido', 'Informe os dados de entrega')
    }
    const productsFormatted = products
      .map((product) => `\n ${product.quantity} ${product.title}`)
      .join('')
    const message = `🍔 NOVO PEDIDO: 
      \n Entregar em: ${address}
      ${productsFormatted}
      \n Valor total: ${total}
    `
    clear()
    goBack()
    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`,
    )

    console.log(message)
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {products.length ? (
              <View className="border-b border-slate-700">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho esta vazio
              </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subTitles">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>
            <Input
              value={address}
              onChangeText={setAddress}
              placeholder="Informe o endereço de entrega com rua, bairo, CEP, número e complemento"
              onSubmitEditing={handleOrder}
              blurOnSubmit
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
