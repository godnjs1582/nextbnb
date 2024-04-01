import { DetailFilterType, FilterProps } from '@/interface'
import { atom } from 'recoil'

export const detaulFilterState = atom<DetailFilterType | null>({
  key: 'defailFilter',
  default: null,
})

export const filterState = atom<FilterProps>({
  key: 'filter',
  default: {
    location: '',
    checkIn: '',
    checkOut: '',
    guest: 0,
  },
})
