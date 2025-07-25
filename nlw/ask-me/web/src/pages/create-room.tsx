import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import amaLogo from '../assets/ama-logo.svg'
import { createRoom } from '../http/create-room'

export default function CreateRoom() {

  const navigate = useNavigate()

  async function handleCreateRoom(data: FormData) {
    const theme = data.get('theme')?.toString()

    if (!theme) return toast.error('Por favor, informe o nome da sala.')

    try {
      const { roomId } = await createRoom({ theme })

      navigate(`/room/${roomId}`)
    } catch (error) {
      console.log(error)
      toast.error('Falha ao criar sala')
    }
  }

  return (
    <main className='h-screen flex items-center justify-center px-4'>
      <div className='max-w-[450px] flex flex-col gap-6'>
        <img src={amaLogo} alt="AMA" className='h-10' />
        <p className='leading-relaxed text-zinc-300 text-center'>Crei uma sala pública  de AMA(ASK me anything) e priorize as perguntas masi importantes para a comunidade</p>
        <form
          className='flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-4 ring-offset-zinc-950 focus-within:ring-1'
          action={handleCreateRoom}
        >
          <input
            type="text"
            name='theme'
            placeholder='Nome da sala'
            autoComplete='off'
            required
            className='flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100'
          />
          <button type='submit' className='bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-orange-500 transition-colors'>
            Criar sala
            <ArrowRight className='size-4' />
          </button>
        </form>
      </div>
    </main>
  )
}
