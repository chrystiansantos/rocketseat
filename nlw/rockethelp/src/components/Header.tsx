import { useNavigation } from '@react-navigation/native';
import {
  Heading,
  HStack,
  IconButton,
  StyledProps,
  useTheme,
} from 'native-base';
import { CaretLeft } from 'phosphor-react-native';

interface IHeaderProps extends StyledProps {
  title: string;
}

export function Header({ title, ...rest }: IHeaderProps) {
  const { colors } = useTheme();
  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
  };
  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      {...rest}
    >
      <IconButton
        onPress={handleGoBack}
        w={12}
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
      />
      <Heading
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        flex={1}
        mr={12}
      >
        {title}
      </Heading>
    </HStack>
  );
}
