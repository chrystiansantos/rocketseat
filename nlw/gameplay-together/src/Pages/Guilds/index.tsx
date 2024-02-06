import React, { useEffect } from 'react'
import { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Guild, IGuild } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'
import { Load } from '../../components/Load'
import { api } from '../../services/api'

import { styles } from './styles'

interface IGuildsProps {
  handleGuildsSelected: (guild: IGuild) => void
}

export const Guilds = ({ handleGuildsSelected }: IGuildsProps) => {
  const [guilds, setGuilds] = useState<IGuild[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchGuilds = async () => {
      const { data } = await api.get('/users/@me/guilds');
      setGuilds(data);
      setLoading(false)
    }
    fetchGuilds();
  }, [])

  return (
    <View style={styles.container}>
      {loading ? <Load /> : <FlatList
        data={guilds}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
        contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        renderItem={({ item }) => (
          <Guild
            onPress={() => handleGuildsSelected(item)}
            data={item}></Guild>
        )}
      />}
    </View>
  )
}