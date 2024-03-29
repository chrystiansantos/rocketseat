import { forwardRef } from 'react'
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

interface ProductDataProps {
  title: string
  description: string
  thumbnail: ImageProps
  quantity?: number
}

interface ProductProps extends TouchableOpacityProps {
  data: ProductDataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  function ProductButton({ data, ...rest }, ref) {
    return (
      <TouchableOpacity
        className="w-full flex-row items-center pb-4"
        activeOpacity={0.7}
        {...rest}
        ref={ref}
      >
        <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />
        <View className="flex-1 ml-3">
          <View className="flex-row items-center">
            <Text className="text-slate-100 font-subTitle text-base flex-1">
              {data.title}
            </Text>
            <Text className="text-slate-400 font-subTitle text-sm">
              x{data?.quantity}
            </Text>
          </View>
          <Text className="text-slate-400 text-xs leading-5 mt-0.5">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  },
)
