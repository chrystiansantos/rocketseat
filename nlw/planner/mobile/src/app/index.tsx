import { Button } from '@/components/button'
import { Calendar } from '@/components/calendar'
import { GuestEmail } from '@/components/email'
import { Input } from '@/components/input'
import { Loading } from '@/components/loading'
import { Modal } from '@/components/modal'
import { tripService } from '@/service/tryp.service'
import { tripStorage } from '@/storage/trip'
import { colors } from '@/styles'
import { DatesSelected, calendarUtils } from '@/utils/calendarUtils'
import { validateInput } from '@/utils/validateInput'
import dayjs from 'dayjs'
import { router } from 'expo-router'
import {
  ArrowRight,
  AtSign,
  Calendar as IconCalendar,
  MapPin,
  Settings2,
  UserRoundPlus,
} from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Alert, Image, Keyboard, Text, View } from 'react-native'
import { DateData } from 'react-native-calendars'

enum STEP_FORM {
  TRIP_DETAILS = 1,
  ADD_EMAILS = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

export default function Home() {
  const [isCreatingTrip, setIsCreatingTrip] = useState(false)
  const [isGettingTrip, setIsGettingTrip] = useState(true)

  // Data
  const [stepForm, setStepForm] = useState(STEP_FORM.TRIP_DETAILS)
  const [selectedDates, setSelectedDates] = useState<DatesSelected>(
    {} as DatesSelected,
  )
  const [destination, setDestination] = useState('')
  const [emailToInvite, setEmailToInvite] = useState('')
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  // Modal
  const [showModal, setShowModal] = useState(MODAL.NONE)

  function handleNextStepForm() {
    if (
      destination.trim().length === 0 ||
      !selectedDates.startsAt ||
      !selectedDates.endsAt
    ) {
      return Alert.alert(
        'Detalhes da viagem',
        'Preencha todas as informações da viagem para seguir.',
      )
    }

    if (destination.length < 4) {
      return Alert.alert(
        'Detalhes da viagem',
        'O destino deve ter pelo menos 4 caracters',
      )
    }

    if (stepForm === STEP_FORM.TRIP_DETAILS) {
      return setStepForm(STEP_FORM.ADD_EMAILS)
    }

    Alert.alert('Nova viagem', 'Confirmar viagem?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: createTrip,
      },
    ])
  }

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    })
    setSelectedDates(dates)
  }

  function handleRemoveEmail(emailToRemove: string) {
    setEmailsToInvite((prevState) =>
      prevState.filter((email) => email !== emailToRemove),
    )
  }

  function handleAddEmail() {
    const emailValid = validateInput.email(emailToInvite)
    if (!emailValid) {
      return Alert.alert('Convidado', 'E-mail inválido')
    }

    const emailAlreadyExists = emailsToInvite.find(
      (email) => email === emailToInvite,
    )

    if (emailAlreadyExists) {
      return Alert.alert('Convidado', 'E-mail já foi adicionado !')
    }

    setEmailsToInvite((prevState) => [...prevState, emailToInvite])
    setEmailToInvite('')
  }

  async function saveTrip(tripId: string) {
    try {
      await tripStorage.save(tripId)
      router.navigate(`/trip/${tripId}`)
    } catch (error) {
      Alert.alert(
        'Salvar viagem',
        'Não foi possível salvar o id da viagem no dispositivo.',
      )
    }
  }

  async function createTrip() {
    try {
      setIsCreatingTrip(true)

      const { tripId } = await tripService.create({
        destination,
        starts_at: dayjs(selectedDates.startsAt?.dateString).toString(),
        ends_at: dayjs(selectedDates.endsAt?.dateString).toString(),
        emails_to_invite: emailsToInvite,
      })

      Alert.alert('Nova viagem', 'Viagem criada com sucesso!', [
        { text: 'Ok. Continuar.', onPress: () => saveTrip(tripId) },
      ])

      await saveTrip('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreatingTrip(false)
    }
  }

  async function getTrip() {
    try {
      const tripId = await tripStorage.get()
      if (!tripId) {
        return null
      }
      const trip = await tripService.getById(tripId)
      if (trip) {
        return router.navigate(`trip/${trip.id}`)
      }
    } catch (error) {
    } finally {
      setIsGettingTrip(false)
    }
  }

  useEffect(() => {
    getTrip()
  }, [])

  if (isGettingTrip) {
    return <Loading />
  }

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Image
        source={require('@/assets/logo.png')}
        className="h-8"
        resizeMode="contain"
        alt="Logo planner"
      />

      <Image
        source={require('@/assets/bg.png')}
        className="absolute"
        alt="bg"
      />

      <Text className="mt-3 text-center font-regular text-lg text-zinc-400">
        Convide seus amigos e planeje sua {'\n'} proxima viagem
      </Text>

      <View className="my-8 w-full rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Para onde?"
            editable={stepForm === STEP_FORM.TRIP_DETAILS}
            onChangeText={setDestination}
          />
        </Input>
        <Input>
          <IconCalendar color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Quando?"
            editable={stepForm === STEP_FORM.TRIP_DETAILS}
            onFocus={() => Keyboard.dismiss()}
            showSoftInputOnFocus={false}
            onPressIn={() =>
              stepForm === STEP_FORM.TRIP_DETAILS &&
              setShowModal(MODAL.CALENDAR)
            }
            value={selectedDates.formatDatesInText}
          />
        </Input>
        {stepForm === STEP_FORM.ADD_EMAILS && (
          <>
            <View className="border-b border-zinc-800 py-3">
              <Button
                variant="secondary"
                onPress={() => setStepForm(STEP_FORM.TRIP_DETAILS)}
              >
                <Button.Title>Alterar local/data</Button.Title>
                <Settings2 color={colors.zinc[200]} size={20} />
              </Button>
            </View>

            <Input>
              <UserRoundPlus color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Quem estará na viagem?"
                autoCorrect={false}
                value={
                  emailsToInvite.length > 0
                    ? `${emailsToInvite.length} pessoa(s) convidada(s)`
                    : ''
                }
                onPressIn={() => {
                  Keyboard.dismiss()
                  setShowModal(MODAL.GUESTS)
                }}
                showSoftInputOnFocus={false}
              />
            </Input>
          </>
        )}
        <Button onPress={handleNextStepForm} isLoading={isCreatingTrip}>
          <Button.Title>
            {stepForm === STEP_FORM.TRIP_DETAILS
              ? 'Continuar'
              : 'Confirmar viagem'}
          </Button.Title>
          <ArrowRight color={colors.lime[950]} size={20} />
        </Button>
      </View>

      <Text className="text-center font-regular text-base text-zinc-500">
        Ao planejar sua viagem pela plann.er você automaticamente concorda com
        nossos{' '}
        <Text className="text-zinc-300 underline">
          termos de uso e políticas de privacidade
        </Text>
      </Text>

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
          <Button onPress={() => setShowModal(MODAL.NONE)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>

      <Modal
        title="Selecionar convidados"
        subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem."
        visible={showModal === MODAL.GUESTS}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="my-2 flex-wrap items-start gap-2 border-b border-zinc-800 py-5">
          {emailsToInvite.length ? (
            emailsToInvite.map((email) => (
              <GuestEmail
                key={email}
                email={email}
                onRemove={() => handleRemoveEmail(email)}
              />
            ))
          ) : (
            <Text className="font-regular text-base text-zinc-600">
              Nenhum e-mail adicionado
            </Text>
          )}
        </View>
        <View className="mt-4 gap-4">
          <Input variant="secondary">
            <AtSign color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Digite o e-mail do convidado"
              keyboardType="email-address"
              onChangeText={(text) =>
                setEmailToInvite(text.toLocaleLowerCase())
              }
              value={emailToInvite}
              returnKeyType="send"
              onSubmitEditing={handleAddEmail}
            />
          </Input>
          <Button onPress={handleAddEmail}>
            <Button.Title>Convidar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
