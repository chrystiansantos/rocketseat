import { Loading } from '@/components/loading'
import '@/styles/global.css'
import '@/utils/dayjsLocaleConfig'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  useFonts,
} from '@expo-google-fonts/inter'
import { Slot } from 'expo-router'
import { StatusBar, View } from 'react-native'

export default function Layout() {
  const [loaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
    Inter_600SemiBold,
  })

  if (!loaded) return <Loading />

  return (
    <View className="flex-1 bg-zinc-950">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Slot />
    </View>
  )
}
