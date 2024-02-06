import React, { useState } from 'react'
import { View, Text, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect'
import { RectButton } from 'react-native-gesture-handler'
import { theme } from '../../global/styles/theme';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/Modal'
import { Guilds } from '../Guilds'
import { IGuild } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../config/database';
import { useNavigation } from '@react-navigation/native';

export const AppointmentCreate = () => {
  const { navigate } = useNavigation();
  const [category, setCategory] = useState<string>('')
  const [openGuildsModal, setOpenGuildsModal] = useState(false)
  const [guild, setGuild] = useState<IGuild>({} as IGuild)
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [description, setDescription] = useState('')

  const handleOpenGuilds = () => {
    setOpenGuildsModal(true);
  }
  const handleCloseGuilds = () => {
    setOpenGuildsModal(false);
  }

  const handleGuildSelect = (guildSelected: IGuild) => {
    setGuild(guildSelected)
    setOpenGuildsModal(false)
  }

  const handleCategorySelect = (categoryId: string) => {
    setCategory(categoryId);
  }

  const handleSave = async () => {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      data: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];
    await AsyncStorage.setItem(COLLECTION_APPOINTMENTS, JSON.stringify([...appointments, newAppointment]))
    navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Background>
        <ScrollView>
          <Header title="Agendar partida"></Header>
          <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
            Categoria
          </Text>
          <CategorySelect
            hasCheckBox
            categorySelected={category}
            setCategory={handleCategorySelect}
          />
          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image} />
                }
                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>
            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Dia e mês</Text>
                <View style={styles.column}>
                  <SmallInput onChangeText={setDay} maxLength={2} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} onChangeText={setMonth} />
                </View>
              </View>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>Horário</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setHour} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} onChangeText={setMinute} />
                </View>
              </View>
            </View>
            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.catacterLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              onChangeText={setDescription}
            />
            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </Background>
      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildsSelected={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  )
}
