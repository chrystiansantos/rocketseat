import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { AuthError, ConnectItem, ConnextBox } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const { query } = useRouter()
  const hasAuthError = !!query.error
  const isSignerIn = session.status === 'authenticated'

  async function handleSignIn() {
    await signIn('google')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>
      <ConnextBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignerIn ? (
            <Button size="sm" disabled>
              Conectado <Check />
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={handleSignIn}>
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>
        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se contar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}
        <Button type="submit" disabled={!isSignerIn}>
          Próximo passo <ArrowRight />
        </Button>
      </ConnextBox>
    </Container>
  )
}
