'use client'
import { Info } from '@phosphor-icons/react'
import Image from 'next/image'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface LoadingNotificationProps {
  updateLoading(status: boolean): void
  setMessageAlert(messageAlert: string | null): void
}

const LoadingNotification = createContext({} as LoadingNotificationProps)

export default function LoadingNotificationProvider({
  children,
}: {
  children: ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string | null>(null)
  const [showAlert, setShowAlert] = useState<
    'animate-show-alert' | 'animate-hide-alert' | ''
  >('')

  function updateLoading(status: boolean) {
    setLoading(status)
  }

  function setMessageAlert(messageAlert: string | null) {
    setAlertMessage(messageAlert)
    setShowAlert('animate-show-alert')
  }

  useEffect(() => {
    if (showAlert === 'animate-show-alert') {
      const timeId = setTimeout(() => setShowAlert('animate-hide-alert'), 3000)

      return () => {
        clearInterval(timeId)
      }
    }
  }, [showAlert])

  return (
    <LoadingNotification.Provider value={{ updateLoading, setMessageAlert }}>
      {loading && (
        <div className="min-h-screen w-full fixed inset-0 z-50 flex items-center justify-center bg-title/50">
          <Image
            src="/loading.gif"
            width={400}
            height={400}
            alt=""
            className="opacity-80"
          />
        </div>
      )}
      {children}
      <div
        className={`fixed bottom-8 right-8 flex items-center gap-3 bg-yellow-light py-2 pl-4 pr-6 translate-y-[400px] rounded-3xl ${showAlert}`}
      >
        <div className="h-8 w-8 bg-yellow text-white flex items-center justify-center rounded-full">
          <Info size={20} weight="bold" />
        </div>
        <div className="flex flex-col">
          <strong className="font-medium text-yellow">Warning</strong>
          <span className="text-text/70 text-sm">{alertMessage}</span>
        </div>
      </div>
    </LoadingNotification.Provider>
  )
}

export function useLoadingNotification() {
  return useContext(LoadingNotification)
}
