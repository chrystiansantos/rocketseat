const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }

interface LocationTypes {
  updateCity: (city: string) => void
  setMessageAlert: (message: string) => void
}

interface GetLocationInfoTypes {
  latitude: number
  longitude: number
}

export const useLocation = ({ setMessageAlert, updateCity }: LocationTypes) => {
  const getLocation = () => {
    navigator.permissions.query({ name: 'geolocation' }).then(function ({
      state,
    }) {
      if (state === 'granted') {
        navigator.geolocation.getCurrentPosition(success, errors, options)
      } else if (state === 'prompt') {
        navigator.geolocation.getCurrentPosition(success, errors, options)
      } else if (state === 'denied') {
        setMessageAlert(
          'Por favor, autorize-nos a obter sua localização para uma melhor experiencia',
        )
      }
    })
  }

  const success = (pos: GeolocationPosition) => {
    const crd = pos.coords
    getLocationInfo({
      latitude: crd.latitude,
      longitude: crd.longitude,
    })
  }

  const errors = (err: GeolocationPositionError) => {
    console.log(err)
    setMessageAlert('Erro ao obter localização. Tente novamente.')
  }

  const getLocationInfo = ({ latitude, longitude }: GetLocationInfoTypes) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_KEY_OPENCAGE}`
    fetch(url)
      .then((response) => response.json())
      .then(({ status, results }) => {
        if (status.code === 200) {
          const { village, state_code: stateCode } = results[0].components
          updateCity(`${village}, ${stateCode}`)
        }
      })
      .catch((error) => console.error(error))
  }
  return {
    getLocation,
  }
}
