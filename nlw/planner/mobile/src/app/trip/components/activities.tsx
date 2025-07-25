import { Activity, ActivityProps as ActivityType } from '@/components/activity'
import { Button } from '@/components/button'
import { Calendar } from '@/components/calendar'
import { Input } from '@/components/input'
import { Loading } from '@/components/loading'
import { Modal } from '@/components/modal'
import { activitiesService } from '@/service/activities.service'
import { colors } from '@/styles'
import dayjs from 'dayjs'
import { CalendarIcon, Clock, PlusIcon, Tag } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Alert, Keyboard, SectionList, Text, View } from 'react-native'
import { TripData } from '../[id]'

interface ActivitiesProps {
  tripDetails: TripData
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  NEW_ACTIVITY = 2,
}

interface TripActivities {
  title: {
    dayNumber: number
    dayName: string
  }
  data: ActivityType[]
}

export function Activities({ tripDetails }: ActivitiesProps) {
  const [showModal, setShowModal] = useState(MODAL.NONE)
  const [isCreatingActivity, setIsCreatingActivity] = useState(false)
  const [isLoadingActivities, setIsLoadingActivities] = useState(true)
  const [activityTitle, setActivityTitle] = useState('')
  const [activityDate, setActivityDate] = useState('')
  const [activityHour, setActivityHour] = useState('')
  const [tripActivities, setTripActivities] = useState<TripActivities[]>([])

  async function handleCreateTripActivity() {
    try {
      if (!activityTitle || !activityDate || !activityHour) {
        return Alert.alert('Cadastrar atividade', 'Preencha todos os campos!')
      }
      setIsCreatingActivity(true)
      await activitiesService.create({
        title: activityTitle,
        occurs_at: dayjs(activityDate)
          .add(Number(activityHour), 'h')
          .toString(),
        tripId: tripDetails.id,
      })

      Alert.alert('Nova atividade', 'Nova atividade cadastrada  com sucesso!')
      await getTripActivities()
      resetNewActivityFields()
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreatingActivity(false)
    }
  }

  function resetNewActivityFields() {
    setActivityDate('')
    setActivityTitle('')
    setActivityHour('')
    setShowModal(MODAL.NONE)
  }

  async function getTripActivities() {
    try {
      const activities = await activitiesService.getActivitiesByTripId(
        tripDetails.id,
      )
      const activitiesToSectionList = activities.map((dayActivity) => ({
        title: {
          dayNumber: dayjs(dayActivity.date).date(),
          dayName: dayjs(dayActivity.date).format('dddd').replace('-feira', ''),
        },
        data: dayActivity.activities.map((activity) => ({
          id: activity.id,
          title: activity.title,
          hour: dayjs(activity.occurs_at).format('hh[:]mm[h]'),
          isBefore: dayjs(activity.occurs_at).isBefore(dayjs()),
        })),
      }))
      setTripActivities(activitiesToSectionList)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingActivities(false)
    }
  }

  useEffect(() => {
    getTripActivities()
  }, [])

  if (isLoadingActivities) return <Loading />

  return (
    <View className="flex-1">
      <View className="mb-6 mt-5 w-full flex-row items-center">
        <Text className="flex-1 font-semibold text-2xl text-zinc-50">
          Atividades
        </Text>

        <Button onPress={() => setShowModal(MODAL.NEW_ACTIVITY)}>
          <PlusIcon size={20} color={colors.lime[950]} />
          <Button.Title>Nova atividade</Button.Title>
        </Button>
      </View>

      {isLoadingActivities ? (
        <Loading />
      ) : (
        <SectionList
          sections={tripActivities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Activity data={item} />}
          renderSectionHeader={({ section }) => (
            <View className="w-full">
              <Text className="py-2 font-semibold text-2xl text-zinc-50">
                Dia {section.title.dayNumber + ' '}
                <Text className="font-regular text-base capitalize text-zinc-500">
                  {section.title.dayName}
                </Text>
              </Text>
              {section.data.length === 0 && (
                <Text className="mb-8 font-regular text-sm text-zinc-500">
                  Nenhuma atividade cadastrada nessa data.
                </Text>
              )}
            </View>
          )}
          contentContainerClassName="gap-3 pb-48"
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        title="Cadastrar atividade"
        subtitle="Todos os convidados podem visualizar as atividades"
        visible={showModal === MODAL.NEW_ACTIVITY}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="mb-3 mt-4">
          <Input variant="secondary">
            <Tag color={colors.zinc[400]} size={20} />
            <Input.Field
              placeholder="Qual atividade"
              onChangeText={setActivityTitle}
              value={activityTitle}
            />
          </Input>
          <View className="mt-2 w-full flex-row gap-2">
            <Input variant="secondary" className="flex-1">
              <CalendarIcon color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Data"
                onChangeText={setActivityTitle}
                value={
                  activityDate ? dayjs(activityDate).format('DD [de] MMMM') : ''
                }
                onFocus={() => Keyboard.dismiss()}
                showSoftInputOnFocus={false}
                onPressIn={() => setShowModal(MODAL.CALENDAR)}
              />
            </Input>

            <Input variant="secondary" className="flex-1">
              <Clock color={colors.zinc[400]} size={20} />
              <Input.Field
                placeholder="Horário?"
                onChangeText={(text) =>
                  setActivityHour(text.replace('.', '').replace(',', ''))
                }
                value={activityHour}
                keyboardType="numeric"
                maxLength={2}
              />
            </Input>
          </View>
        </View>
        <Button
          onPress={handleCreateTripActivity}
          isLoading={isCreatingActivity}
        >
          <Button.Title>Salvar atividade</Button.Title>
        </Button>
      </Modal>

      <Modal
        title="Selecionar data"
        subtitle="Selecione a data da atividade"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="mt-4 gap-4">
          <Calendar
            onDayPress={(day) => setActivityDate(day.dateString)}
            markedDates={{ [activityDate]: { selected: true } }}
            initialDate={tripDetails.starts_at.toString()}
            minDate={tripDetails.starts_at.toString()}
            maxDate={tripDetails.ends_at.toString()}
          />
          <Button onPress={() => setShowModal(MODAL.NEW_ACTIVITY)}>
            <Button.Title>Confirmar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
