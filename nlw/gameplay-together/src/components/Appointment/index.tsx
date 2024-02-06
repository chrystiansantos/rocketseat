import React from 'react'
import { View, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'

import { categories } from '../../utils/categories'

import { GuildIcon } from '../GuildIcon'
import PlayerSvg from '../../assets/player.svg'
import CalendarSvg from '../../assets/calendar.svg'
import { IGuild } from '../Guild'

import { styles } from './styles'
import { theme } from '../../global/styles/theme'

export interface IAppointment {
  id: string;
  guild: IGuild;
  category: string;
  data: string;
  description: string
}

interface IAppointmentsProps extends RectButtonProps {
  data: IAppointment
}

export function Appointments({ data, ...rest }: IAppointmentsProps) {

  const [category] = categories.filter(item => item.id === data.category)
  const { owner } = data.guild;
  const { secondary70, secondary50, primary, on } = theme.colors;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <LinearGradient
          style={styles.guildIconContainer}
          colors={[secondary50, secondary70]}>
          <GuildIcon iconId={data.guild.icon} guildId={data.guild.id} />
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{data.guild.name}</Text>
            <Text style={styles.category}>{category?.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />
              <Text style={styles.date}>
                {data.data}
              </Text>
            </View>

            <View style={styles.playersInfo}>
              <PlayerSvg fill={owner ? primary : on}></PlayerSvg>
              <Text style={[
                styles.player, { color: owner ? primary : on }
              ]}>{owner ? 'Anfitrião' : 'VIsitante'}</Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton >
  )
}
