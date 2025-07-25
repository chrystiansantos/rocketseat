import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createMessageReaction } from "../http/create-message-reaction";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({ id: messageId, text, amountOfReactions, answered = false }: MessageProps) {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  const [hasReacted, setHasReacted] = useState(false)

  async function handleCreateMessageReactionAction() {
    if(!roomId) return
    try {
      await createMessageReaction({
        roomId,
        messageId
      })
    } catch (error) {
      console.log(error)
      toast.error('Falha ao reagir mensagem, tente novamente')
    }
    setHasReacted(false)
  }

  async function handleRemoveMessageReactionAction() {
    if(!roomId) return
    try {
      await removeMessageReaction({
        roomId,
        messageId
      })
    } catch (error) {
      console.log(error)
      toast.error('Falha ao remover reação, tente novamente')
    }
    setHasReacted(true)

  }


  return (
    <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
      {text}
      {hasReacted ? (
        <button
          type="button"
          onClick={handleRemoveMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500">
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          type='button'
          onClick={handleCreateMessageReactionAction}
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300"
        >
          <ArrowUp className='size-4' />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  )
}
