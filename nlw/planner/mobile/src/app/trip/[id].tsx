/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/button'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Loading } from '@/components/loading'
import { Modal } from '@/components/modal'
import { participantsService } from '@/service/participants.service'
import { TripDetails, tripService } from '@/service/tryp.service'
import { tripStorage } from '@/storage/trip'
import { colors } from '@/styles'
import { DatesSelected, calendarUtils } from '@/utils/calendarUtils'
import { validateInput } from '@/utils/validateInput'
import dayjs from 'dayjs'
import { router, useLocalSearchParams } from 'expo-router'
import {
  CalendarRange,
  Calendar as IconCalendar,
  Mail,
  MapPin,
  Settings2,
  User,
} from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Alert, Keyboard, Text, TouchableOpacity, View } from 'react-native'
import { DateData } from 'react-native-calendars'
import { Activities } from './components/activities'
import { Details } from './components/details'

export interface TripData extends TripDetails {
  when: string
}

enum ACTIONS_BUTTON {
  activity = 1,
  details = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  UPDATE_TRIP = 2,
  CONFIRM_ATTENDANCE = 3,
}

export default function Trip() {
  const [isLoadingTrip, setIsLoadingTrip] = useState(true)
  const [isUpdatingTrip, setIsUpdatingTrip] = useState(false)
  const [isConfirmingAttendance, setIsConfirmingAttendance] = useState(false)

  const [showModal, setShowModal] = useState(MODAL.NONE)

  const [tripDetails, setTripDetails] = useState({} as TripData)
  const [option, setOption] = useState(ACTIONS_BUTTON.activity)
  const [destination, setDestination] = useState('')
  const [selectedDates, setSelectedDates] = useState<DatesSelected>(
    {} as DatesSelected,
  )
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')

  const tripParams = useLocalSearchParams<{
    id: string
    participant?: string
  }>()

  async function getTripDetails() {
    try {
      setIsLoadingTrip(true)

      if (tripParams.participant) setShowModal(MODAL.CONFIRM_ATTENDANCE)

      if (!tripParams.id) {
        return router.back()
      }
      const trip = await tripService.getById(tripParams.id)

      const maxLengthDestination = 14
      const destination =
        trip.destination.length > maxLengthDestination
          ? trip.destination.slice(0, maxLengthDestination).concat('...')
          : trip.destination

      const starts_at = dayjs(trip.starts_at).format('DD')
      const ends_at = dayjs(trip.ends_at).format('DD')
      const month = dayjs(trip.starts_at).format('MMMM')

      setDestination(trip.destination)

      setTripDetails({
        ...trip,
        when: `${destination} de ${starts_at} a ${ends_at} de ${month}.`,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingTrip(false)
    }
  }

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    })
    setSelectedDates(dates)
  }

  async function handleUpdateTrip() {
    try {
      if (!tripParams.id) return

      if (!destination || !selectedDates.startsAt || !selectedDates.endsAt) {
        return Alert.alert(
          'Atualizar viagem',
          'Lembre-se de além de preencher o destino, selecione data de início e fim da viagem',
        )
      }

      setIsUpdatingTrip(true)

      await tripService.update({
        id: tripParams.id,
        destination,
        starts_at: dayjs(selectedDates.startsAt.dateString).toString(),
        ends_at: dayjs(selectedDates.endsAt.dateString).toString(),
      })

      Alert.alert('Atualizar viagem', 'Viagem atualizada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setShowModal(MODAL.NONE)
            getTripDetails()
          },
        },
      ])
    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdatingTrip(false)
    }
  }

  async function handleConfirmAttendance() {
    try {
      if (!tripParams.participant || !tripParams.id) return

      if (!guestName.trim() || guestEmail.trim())
        return Alert.alert(
          'Confirmação',
          'Preencha nome e e-mail para confirmar a viagem',
        )

      if (!validateInput.email(guestEmail.trim()))
        return Alert.alert('Confirmação', 'E-mail inválido')

      await participantsService.confirmTripByParticipantId({
        participantId: tripParams.participant,
        email: guestEmail,
        name: guestName,
      })

      Alert.alert('Confirmação', 'Viagem confirmada com sucesso!')
      setShowModal(MODAL.NONE)
      await tripStorage.save(tripParams.id)
    } catch (error) {
      console.log(error)
      Alert.alert('Confirmação', '')
    } finally {
      setIsConfirmingAttendance(false)
    }
  }

  async function handleRemoveTrip() {
    try {
      Alert.alert('Remover Viagem', 'Tem certeza que deseja remover a viagem', [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            await tripStorage.remove()
            router.navigate('/')
          },
        },
      ])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTripDetails()
  }, [])

  if (isLoadingTrip) return <Loading />

  return (
    <View className="flex-1 px-5 pt-16">
      <Input variant="tertiary">
        <MapPin color={colors.zinc[400]} size={20} />
        <Input.Field value={tripDetails.when} readOnly />
        <TouchableOpacity
          activeOpacity={0.6}
          className="h-9 w-9 items-center justify-center rounded bg-zinc-800"
          onPress={() => setShowModal(MODAL.UPDATE_TRIP)}
        >
          <Settings2 color={colors.zinc[400]} size={20} />
        </TouchableOpacity>
      </Input>

      {option === ACTIONS_BUTTON.activity ? (
        <Activities tripDetails={tripDetails} />
      ) : (
        <Details tripId={tripDetails.id} />
      )}

      <View className="absolute -bottom-1 z-10 w-full justify-end self-center bg-zinc-950 pb-5">
        <View className="w-full flex-row gap-2 rounded-lg border-zinc-800 bg-zinc-900 p-4">
          <Button
            className="flex-1"
            variant={
              option === ACTIONS_BUTTON.activity ? 'primary' : 'secondary'
            }
            onPress={() => setOption(ACTIONS_BUTTON.activity)}
          >
            <CalendarRange
              fontSize={20}
              color={
                option === ACTIONS_BUTTON.activity
                  ? colors.lime[950]
                  : colors.zinc[200]
              }
            />
            <Button.Title>Atividades</Button.Title>
          </Button>
          <Button
            className="flex-1"
            onPress={() => setOption(ACTIONS_BUTTON.details)}
            variant={
              option === ACTIONS_BUTTON.details ? 'primary' : 'secondary'
            }
          >
            <CalendarRange
              fontSize={20}
              color={
                option === ACTIONS_BUTTON.details
                  ? colors.lime[950]
                  : colors.zinc[200]
              }
            />
            <Button.Title>Detalhes</Button.Title>
          </Button>
        </View>
      </View>

      <Modal
        title="Atualizar viagem"
        subtitle="Somente quem criou a viagem pode editar"
        visible={showModal === MODAL.UPDATE_TRIP}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="my-4 gap-2">
          <Input variant="secondary">
            <MapPin color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Para onde?"
              value={destination}
              onChangeText={setDestination}
            />
          </Input>
          <Input variant="secondary">
            <IconCalendar color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Quando?"
              value={selectedDates.formatDatesInText}
              onPressIn={() => setShowModal(MODAL.CALENDAR)}
              onFocus={() => Keyboard.dismiss()}
            />
          </Input>

          <Button onPress={handleUpdateTrip} isLoading={isUpdatingTrip}>
            <Button.Title>Atualizar</Button.Title>
          </Button>

          <TouchableOpacity activeOpacity={0.8} onPress={handleRemoveTrip}>
            <Text className="mt-6 text-center text-red-400">
              Remover viagem
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        title="Selecionar datas"
        subtitle="Selecione a data de ida e volta da viagem"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="mt-4 gap-4">
          <Calendar
            onDayPress={handleSelectDate}
            markedDates={selectedDates.dates}
            minDate={dayjs().toISOString()}
          />
          <Button onPress={() => setShowModal(MODAL.UPDATE_TRIP)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>

      <Modal
        title="Confirmar presença"
        visible={showModal === MODAL.CONFIRM_ATTENDANCE}
      >
        <View className="mt-4 gap-4">
          <Text className="my-2 font-regular leading-6 text-zinc-400">
            Você foi convidado (a) para participar de uma viagem para{' '}
            <Text className="font-semibold text-zinc-100">
              {tripDetails.destination}
            </Text>{' '}
            nas datas de{' '}
            <Text className="font-semibold text-zinc-100">
              {dayjs(tripDetails.starts_at).date()} a{' '}
              {dayjs(tripDetails.ends_at).date()} de{' '}
              {dayjs(tripDetails.ends_at).format('MMMM')}. {'\n\n'}
            </Text>
            Para confirmar sua presença na viagem preencha os dados abaixo
          </Text>
          <Input variant="secondary">
            <User color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Seu nome completo"
              value={guestName}
              onChangeText={setGuestName}
            />
          </Input>
          <Input variant="secondary">
            <Mail color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="E-mail de confirmação"
              value={guestEmail}
              onChangeText={setGuestEmail}
              keyboardType="email-address"
            />
          </Input>
          <Button
            onPress={handleConfirmAttendance}
            isLoading={isConfirmingAttendance}
          >
            <Button.Title>Confirmar minha presença</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
