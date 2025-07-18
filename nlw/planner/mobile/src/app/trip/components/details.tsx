import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { Participant, ParticipantProps } from '@/components/participant'
import { TripLink, TripLinkProps } from '@/components/tripLink'
import { linksService } from '@/service/link.service'
import { participantsService } from '@/service/participants.service'
import { colors } from '@/styles'
import { validateInput } from '@/utils/validateInput'
import { Plus } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'

interface DetailsProps {
  tripId: string
}

export function Details({ tripId }: DetailsProps) {
  const [showNewLinkModal, setShowNewLinkModal] = useState(false)
  const [linkTitle, setLinkTitle] = useState('')
  const [linkURL, setLinkURL] = useState('')
  const [isCreateLinkTrip, setIsCreateLinkTrip] = useState(false)
  const [links, setLinks] = useState<TripLinkProps[]>([])
  const [participants, setParticipants] = useState<ParticipantProps[]>([])

  async function handleCreateTripLink() {
    try {
      if (!linkTitle.trim().length)
        return Alert.alert('Link', 'Informe um título para o link.')

      const urlValid = validateInput.url(linkURL.trim())
      if (!urlValid) return Alert.alert('Link', 'Link inválido!')

      setIsCreateLinkTrip(true)

      await linksService.create({
        title: linkTitle,
        tripId,
        url: linkURL,
      })
      Alert.alert('Link', 'Link criado com sucesso!')
      resetNewLinkFields()
      getTripLinks()
    } catch (error) {
      console.log(error)
    } finally {
      setIsCreateLinkTrip(false)
    }
  }

  async function getTripLinks() {
    try {
      const links = await linksService.getLinksByTripId(tripId)
      setLinks(links)
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  function resetNewLinkFields() {
    setLinkTitle('')
    setLinkURL('')
    setShowNewLinkModal(false)
  }

  async function getTripParticipants() {
    try {
      const participants = await participantsService.getByTripId(tripId)
      setParticipants(participants)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTripLinks()
    getTripParticipants()
  }, [])

  return (
    <View className="mt-10 flex-1">
      <Text className="mb-2 font-semibold text-2xl text-zinc-50">
        Links importantes
      </Text>

      <View className="flex-1">
        {links.length > 0 ? (
          <FlatList
            data={links}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TripLink data={item} key={item.id} />}
            contentContainerClassName="gap-4"
          />
        ) : (
          <Text className="mb-6 mt-2 font-regular text-base text-zinc-400">
            Nenhum link adicionado
          </Text>
        )}

        <Button variant="secondary" onPress={() => setShowNewLinkModal(true)}>
          <Plus color={colors.zinc[200]} size={20} />
          <Button.Title>Cadastrar novo link</Button.Title>
        </Button>
      </View>

      <View className="mt-6 flex-1 border-t border-zinc-800">
        <Text className="my-6 font-semibold text-2xl text-zinc-50">
          Convidados
        </Text>

        <FlatList
          data={participants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Participant data={item} key={item.id} />}
          contentContainerClassName="gap-4 pb-44"
        />
      </View>

      <Modal
        title="Cadastrar link"
        subtitle="Todos os convidados podem visualizar os links importantes."
        visible={showNewLinkModal}
        onClose={() => setShowNewLinkModal(false)}
      >
        <View className="mb-3 gap-2">
          <Input variant="secondary">
            <Input.Field
              placeholder="Título do link"
              onChangeText={setLinkTitle}
              value={linkTitle}
            />
          </Input>
          <Input variant="secondary">
            <Input.Field placeholder="URL" onChangeText={setLinkURL} />
          </Input>
          <Button isLoading={isCreateLinkTrip} onPress={handleCreateTripLink}>
            <Button.Title>Salvar novo link</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
