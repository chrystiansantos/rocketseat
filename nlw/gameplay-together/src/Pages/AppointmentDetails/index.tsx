import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, FlatList, Alert, Platform, Share } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { Fontisto } from '@expo/vector-icons'
import * as Linking from 'expo-linking'

import banner from '../../assets/banner.png'

import { ListHeader } from '../../components/ListHeader'
import { Background } from '../../components/Background'
import { Header } from '../../components/Header'
import { theme } from '../../global/styles/theme'
import { Member, MemberProps } from '../../components/Member'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'

import { styles } from './style'
import { IAppointment } from '../../components/Appointment'
import { api } from '../../services/api'
import { Load } from '../../components/Load'

interface IParams {
  guildSelected: IAppointment
}

interface IGuildWidget {
  id: String;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<IGuildWidget>({} as IGuildWidget)
  const [loading, setLoading] = useState(true)
  const route = useRoute();
  const { guildSelected } = route.params as IParams

  useEffect(() => {
    fetchGuildWidget();
  }, [])

  const handleShareInvition = () => {
    const message = Platform.OS === 'ios' ?
      `Junte-se a ${guildSelected.guild.name}` :
      widget.instant_invite;
    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  const handleOpenGuild = () => {
    Linking.openURL(widget.instant_invite);
  }

  const fetchGuildWidget = async () => {
    try {
      const { data } = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(data);
    } catch (error) {
      Alert.alert('Verifique as configurações do servidor. Sera que o Widget está habilitado ?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <BorderlessButton onPress={handleShareInvition}>
            <Fontisto
              name="share"
              size={24}
              color={theme.colors.primary}
            >
            </Fontisto>
          </BorderlessButton>
        }
      />
      <ImageBackground
        source={banner}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>
      {
        loading ? <Load /> : (
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget.members.length}`}
            />
            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
              renderItem={({ item }) => (
                <Member data={item}></Member>
              )}
            />
            {
              widget.instant_invite && (
                <View style={styles.footer}>
                  <ButtonIcon onPress={handleOpenGuild} title="Entrar na partida"></ButtonIcon>
                </View>
              )
            }
          </>
        )
      }
    </Background >
  )
}
