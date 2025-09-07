import type { GalleryImage } from './types'
import photo1 from '../../shared/assets/Gallery/photo1.jpg'
import photo2 from '../../shared/assets/Gallery/photo2.jpg'
import photo3 from '../../shared/assets/Gallery/photo3.jpg'
import photo4 from '../../shared/assets/Gallery/photo4.jpg'
import photo5 from '../../shared/assets/Gallery/photo5.jpg'
import photo6 from '../../shared/assets/Gallery/photo6.jpg'



// Простые изображения для альбома
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'work-1',
    src: photo1,
    alt: 'Работа 1 - Классическое наращивание'
  },
  {
    id: 'work-2', 
    src: photo2,
    alt: 'Работа 2 - Объемное наращивание'
  },
  {
    id: 'work-3',
    src: photo3, 
    alt: 'Работа 3 - Ламинирование ресниц'
  },
  {
    id: 'work-4',
    src: photo4,
    alt: 'Работа 4 - Коррекция наращивания'
  },
  {
    id: 'work-5',
    src: photo5,
    alt: 'Работа 5 - Мега-объем'
  },
  {
    id: 'work-6',
    src: photo6,
    alt: 'Работа 6 - Естественные ресницы'
  }
]
