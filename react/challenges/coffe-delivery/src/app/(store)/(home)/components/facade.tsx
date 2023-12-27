import Image from 'next/image'
import { PurchaseDescriptions } from './purchase-descriptions'

export function Facade() {
  return (
    <div
      className="w-full py-24 sm:px-6"
      style={{
        backgroundImage: 'url(/background.png)',
        backgroundSize: 'cover',
      }}
    >
      <div className="flex max-w-[1120px] mx-auto items-center justify-center gap-14">
        <div>
          <div className="mb-16">
            <h1 className="font-baloo2 font-extrabold text-5xl text-title">
              Encontre o café perfeito <br /> para qualquer hora do dia
            </h1>
            <h2 className="text-xl mt-4 text-subtitle">
              Com o Coffee Delivery você recebe seu café onde estiver, a <br />
              qualquer hora
            </h2>
          </div>
          <PurchaseDescriptions />
        </div>
        <Image
          className="sm:hidden"
          src="/cup-coffee.png"
          height={360}
          width={476}
          alt=""
        />
      </div>
    </div>
  )
}
