'use client'
import { useLocation } from '@/utils/get-location'
import { MapPin } from '@phosphor-icons/react/dist/ssr'
import { useEffect, useState } from 'react'
import { useLoadingNotification } from '../context/LoadingNotification'

export function CityButton() {
  const { setMessageAlert } = useLoadingNotification()
  const [city, setCity] = useState('')

  const updateCity = (city: string) => {
    setCity(city)
  }

  const { getLocation } = useLocation({
    setMessageAlert,
    updateCity,
  })

  useEffect(() => {
    getLocation()
  }, [getLocation])

  return (
    <>
      {city && (
        <button className="flex items-center gap-1 bg-purple-light rounded-[6px] py-2.5 px-2 text-sm	text-purple-dark">
          <MapPin className="text-purple" size={22} weight="fill" />
          {city}
        </button>
      )}
    </>
  )
}
