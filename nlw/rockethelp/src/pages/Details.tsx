import { useNavigation, useRoute } from '@react-navigation/native';
import {
  HStack,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import { useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  CircleWavyCheck,
  ClipboardText,
  DesktopTower,
  Hourglass,
} from 'phosphor-react-native';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { Header } from '../components/Header';
import { IOrder } from '../components/Order';
import { IOrder as IOrderDTO } from '../DTOs/IOrder';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

interface IRouteParams {
  orderId: string;
}

interface IOrderDetails extends IOrder {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const { params } = useRoute();
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { orderId } = params as IRouteParams;
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<IOrderDetails>({} as IOrderDetails);
  const [solutionInput, setSolutionInput] = useState('');
  const scrollViewRef = useRef(null);

  const handleOrderClose = () => {
    firestore()
      .collection<IOrderDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution: solutionInput,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada');
        goBack();
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação');
      });
  };

  useEffect(() => {
    const subscribe = firestore()
      .collection<IOrderDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();
        const closed = closed_at ? dateFormat(closed_at) : '';

        setOrder({
          id: doc.id,
          patrimony,
          description,
          solution,
          closed,
          when: dateFormat(created_at),
          status,
        });
        setIsLoading(false);
      });
    // return subscribe;
  }, []);

  if (isLoading) return <Loading />;

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack flex={1} bg="gray.700">
          <Header title="Solicitação" />

          <HStack bg="gray.500" justifyContent="center" p={4}>
            {order.status === 'closed' ? (
              <CircleWavyCheck size={22} color={colors.green[300]} />
            ) : (
              <Hourglass size={22} color={colors.secondary[700]} />
            )}
            <Text
              fontSize="sm"
              color={
                order.status === 'closed'
                  ? colors.green[300]
                  : colors.secondary[700]
              }
              ml={2}
              textTransform="uppercase"
            >
              {order.status === 'closed' ? 'Finalizado' : 'Em andamento'}
            </Text>
          </HStack>
          <ScrollView
            ref={scrollViewRef}
            mx={5}
            showsVerticalScrollIndicator={false}
          >
            <CardDetails
              title="Equipamento"
              description={`Patrimônio ${order.patrimony}`}
              icon={DesktopTower}
            />
            <CardDetails
              title="Descrição do problema"
              description={order.description}
              icon={ClipboardText}
              footer={`Registrado em ${order.when}`}
            />
            <CardDetails
              title="Solução"
              icon={CircleWavyCheck}
              description={order.solution}
              footer={order.closed && `Encerrado em ${order.closed}`}
            >
              {order.status === 'open' && (
                <Input
                  placeholder="Descrição"
                  onChangeText={setSolutionInput}
                  value={solutionInput}
                  h={24}
                  textAlignVertical="top"
                  multiline
                  onFocus={() => {
                    scrollViewRef.current.scrollToEnd();
                  }}
                />
              )}
            </CardDetails>
          </ScrollView>
          {order.status === 'open' && (
            <Button
              isDisabled={!solutionInput}
              title="Encerrar solicitação"
              margin={5}
              onPress={handleOrderClose}
            />
          )}
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
