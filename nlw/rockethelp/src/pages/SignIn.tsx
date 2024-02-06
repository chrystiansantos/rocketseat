import {
  VStack,
  Heading,
  Icon,
  useTheme,
  KeyboardAvoidingView,
} from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function SignIn() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(resp => console.log(resp))
      .catch(error => {
        setLoading(false);
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', 'E-mail inválido');
        }
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          return Alert.alert('Entrar', 'Email ou senha inválida');
        }
        return Alert.alert('Entrar', 'Não foi possível acessar');
      });
  };

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack
          flex={1}
          alignItems="center"
          justifyContent="center"
          bg="gray.600"
          px={8}
        >
          <Logo />
          {/* <Heading color="gray.100" mt={20} mb={6}>
            Acesse sua conta
          </Heading> */}
          <Input
            placeholder="E-mail"
            mt={16}
            mb={4}
            autoCapitalize="none"
            InputLeftElement={
              <Icon ml={4} as={<Envelope color={colors.gray[300]} />} />
            }
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Senha"
            mb={8}
            InputLeftElement={
              <Icon ml={4} as={<Key color={colors.gray[300]} />} />
            }
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button
            isDisabled={!email || !password}
            isLoading={loading}
            title="Entrar"
            w="full"
            onPress={handleSignIn}
          />
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
