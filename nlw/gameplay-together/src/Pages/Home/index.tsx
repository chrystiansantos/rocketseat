import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { styles } from './styles'
import { Profile } from '../../components/Profile'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader'
import { FlatList } from "react-native-gesture-handler";
import { Appointments, IAppointment } from '../../components/Appointment'
import { ListDivider } from '../../components/ListDivider'
import { Background } from '../../components/Background'
import { Load } from '../../components/Load'
import { COLLECTION_APPOINTMENTS } from "../../config/database";

export function Home() {
  const [category, setCategory] = useState<string>('')
  const [appointments, setAppointments] = useState<IAppointment[]>([])
  const [loading, setLoading] = useState(true)
  const { navigate } = useNavigation();

  const handleCategorySelect = (categoryId: string) => {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  const handleAppointmentDetails = (guildSelected: IAppointment) => {
    navigate('AppointmentDetails', { guildSelected });
  }
  const handleCreateAppointment = () => {
    navigate('AppointmentCreate')
  }

  const loadAppointments = async () => {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: IAppointment[] = response ? JSON.parse(response) : [];
    try {
      if (category) {
        const appointmentsFilter = storage.filter(appointment => appointment.category === category);
        setAppointments(appointmentsFilter);
        // return;
      } else {
        setAppointments(storage)
      }
    } catch {
      Alert.alert('Ocorreu um erro ao carregar os agendamentos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAppointments();
  }, [])

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]
  ))

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleCreateAppointment} />
      </View>
      <View>
        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />
        {
          loading ? <Load /> : (
            <>
              <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} ></ListHeader>
              <FlatList
                data={appointments}
                keyExtractor={item => item.id}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
                contentContainerStyle={{ paddingBottom: 69 }}
                renderItem={({ item }) => (
                  <Appointments
                    data={item}
                    onPress={() => handleAppointmentDetails(item)}
                  ></Appointments>
                )}
              />
            </>
          )
        }

      </View>
    </Background>
  )
}
