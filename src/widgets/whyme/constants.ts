import PHOTO from '../../shared/assets/whyme/whyme.jpg'

export type Reason = {
  id: string
  title: string
  description: string
}

export const REASONS: ReadonlyArray<Reason> = [
  {
    id: 'licensed-trainer',
    title: 'Лицензированный мастер и тренер',
    description: 'С 2010 года, г. Ростов‑на‑Дону.'
  },
  {
    id: 'awards',
    title: 'Победитель международных чемпионатов',
    description: 'Участник и победитель чемпионатов по перманентному макияжу. Спикер и судья.'
  },
  {
    id: 'upskill',
    title: 'Постоянное повышение квалификации',
    description: 'Повышаю свою квалификацию у самых лучших.'
  },
  {
    id: 'events',
    title: 'Конференции и мастер‑классы',
    description: 'Активный участник многочисленных конференций и мастер‑классов.'
  },
  {
    id: 'individual',
    title: 'Индивидуальный подход',
    description: 'Высокое качество услуг и закрытие потребностей каждого клиента.'
  },
  {
    id: 'author-tech',
    title: 'Авторская техника «без эскиза»',
    description: 'Сокращение времени процедуры при безупречной точности.'
  }
] as const

export const WHY_ME_MEDIA = {
  photoSrc: PHOTO,
  photoAlt: 'Почему выбрать меня — портрет мастера'
} as const


