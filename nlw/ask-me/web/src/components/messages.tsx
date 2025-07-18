import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoomMessages } from "../http/get-room-messages";
import { Message } from "./message";

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error('Messages components must be used within room page')
  }

  // const { messages } = use(getRoomMessages({ roomId }))

  // console.log(messages)

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId })
  })

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {
        data.messages.map(({ id, text, amountOfReactions, answered }) => (
          <Message
            key={id}
            id={id}
            text={text}
            amountOfReactions={amountOfReactions}
            answered={answered} />
        ))
      }
    </ol>
  )
}
