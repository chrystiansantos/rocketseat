import { KeyboardAvoidingView, VStack } from 'native-base';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
  const { goBack } = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const handleNewOrderRegister = () => {
    setIsLoading(true);
    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso.');
        goBack();
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          'Solicitação',
          'Não foi possível registrar o pedido',
        );
      });
  };

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack flex={1} p={6} bg="gray.600">
          <Header title="Nova solicitação" />

          <Input
            placeholder="Número do patrimônio"
            mt={4}
            value={patrimony}
            onChangeText={setPatrimony}
          />
          <Input
            placeholder="Descrição do problema"
            mt={5}
            flex={1}
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
          <Button
            isDisabled={!patrimony || !description}
            isLoading={isLoading}
            mt={5}
            onPress={handleNewOrderRegister}
            title="Cadastrar"
          />
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
