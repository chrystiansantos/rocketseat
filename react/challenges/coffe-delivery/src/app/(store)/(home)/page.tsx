import { CoffeeList } from './components/coffee-list'
import { Facade } from './components/facade'

export default async function Home() {
  const coffees = await (
    await fetch('http://localhost:3333/coffees', {
      next: {
        revalidate: 60 * 60 * 24,
      },
    })
  ).json()

  await new Promise((resolve) => setTimeout(() => resolve(''), 5000))

  return (
    <>
      <Facade />
      <CoffeeList coffees={coffees} />
    </>
  )
}
