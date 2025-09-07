import type { PricingItem } from './types'

export const PRICING_DATA: PricingItem[] = [
  {
    id: 'extension-classic',
    title: 'НАРАЩИВАНИЕ РЕСНИЦ',
    price: 'от 2000 руб.',
    description: 'Классика, 2D, 3D, 4D, Голливуд, Лэд'
  },
  {
    id: 'permanent-makeup',
    title: 'ПЕРМАНЕНТНЫЙ МАКИЯЖ',
    price: 'от 6000 руб.',
    description: 'Брови, Губы, Стрелка с растушевкой, Межресничка, Коррекция, Обновление'
  },
  {
    id: 'lamination',
    title: 'ЛАМИНИРОВАНИЕ РЕСНИЦ/БРОВЕЙ',
    price: 'от 2000 руб.',
    description: 'Подкручивание, укрепление и окрашивание собственных ресниц'
  },
  {
    id: 'correction',
    title: 'КОРРЕКЦИЯ',
    price: 'от 500 руб.',
    description: 'Коррекция и окрашивание бровей, Коррекция бровей (пинцет, воск), Усики воском, Волосы по лицу воском'
  }
]