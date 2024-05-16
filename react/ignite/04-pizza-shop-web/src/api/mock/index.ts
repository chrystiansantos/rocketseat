import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { approveOrderMock } from './approve-order-mock'
import { cancelOrderMock } from './cancel-order-mock'
import { deliverOrderMock } from './deliver-order-mock'
import { dispatchOrderMock } from './dispatch-order-mock'
import { getDallyRevenueInPeriod } from './get-dally-revenue-in-period-mock'
import { getDayOrderAmountMock } from './get-day-orders-amount-mock'
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { getMonthRevenueMock } from './get-mont-revenue-mock'
import { getMonthCanceledAmountMock } from './get-month-canceled-orders-amount-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getOrderDetailsMock } from './get-order-details-mock'
import { getOrdersMock } from './get-orders-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { getProfileMock } from './get-profile-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'
import { updateProfileMock } from './update-profile-mock'

const worker = setupWorker(
  signInMock,
  registerRestaurantMock,
  getDayOrderAmountMock,
  getMonthRevenueMock,
  getMonthCanceledAmountMock,
  getMonthOrdersAmountMock,
  getDallyRevenueInPeriod,
  getPopularProductsMock,
  getProfileMock,
  getProfileMock,
  updateProfileMock,
  getManagedRestaurantMock,
  getOrdersMock,
  getOrderDetailsMock,
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') return
  await worker.start()
}
