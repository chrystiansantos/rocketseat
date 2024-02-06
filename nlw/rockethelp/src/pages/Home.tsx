import { useNavigation } from '@react-navigation/native';
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Logo from '../assets/logo_secondary.svg';
import { Button } from '../components/Button';
import { Filter } from '../components/Filter';
import { IOrder, Order } from '../components/Order';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';

export function Home() {
  const { colors } = useTheme();
  const { navigate } = useNavigation();
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>(
    'open',
  );
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const handleNewOrder = () => {
    navigate('new');
  };

  const handleOpenDetails = (id: string) => {
    navigate('details', {
      orderId: id,
    });
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .catch(err => {
        console.log(err);
        Alert.alert('Sair', 'Não foi possível sair');
      });
  };

  useEffect(() => {
    setLoading(true);

    const subscribe = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(response => {
        const data = response.docs.map(doc => {
          const { created_at, description, patrimony, status } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          };
        });
        setOrders(data);
        setLoading(false);
      });

    return subscribe;
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          onPress={handleLogout}
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="open"
            title="em andamento"
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter
            type="closed"
            title="finalizado"
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>
        {!loading ? (
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Order onPress={() => handleOpenDetails(item.id)} data={item} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            // eslint-disable-next-line react/no-unstable-nested-components
            ListEmptyComponent={() => (
              <VStack justifyContent="center" h="xs">
                <HStack justifyContent="center">
                  <ChatTeardropText color={colors.gray[300]} size={40} />
                </HStack>
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {'\n'} solicitações{' '}
                  {statusSelected === 'open' ? 'em aberto' : 'finalizados'}
                </Text>
              </VStack>
            )}
          />
        ) : (
          <Loading />
        )}
        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
