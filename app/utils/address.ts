import type { StoreCartAddress } from '@medusajs/types'
import lodash from 'lodash'

const { isEqual, pick } = lodash

export function compareAddresses(address1?: StoreCartAddress, address2?: StoreCartAddress) {
  return isEqual(
    pick(address1, [
      'first_name',
      'last_name',
      'address_1',
      'company',
      'postal_code',
      'city',
      'country_code',
      'province',
      'phone',
    ]),
    pick(address2, [
      'first_name',
      'last_name',
      'address_1',
      'company',
      'postal_code',
      'city',
      'country_code',
      'province',
      'phone',
    ]),
  )
}
