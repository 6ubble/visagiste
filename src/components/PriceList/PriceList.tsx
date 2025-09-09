import { useState } from 'react'
import { GALLERY_BLOCKS } from './constants.ts'
import PriceListModal from './PriceListModal'

function PriceList() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBlockId, setCurrentBlockId] = useState<string | null>(null)

  const openModal = (blockId: string, indexInBlock: number) => {
    setCurrentBlockId(blockId)
    setCurrentIndex(indexInBlock)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    const block = GALLERY_BLOCKS.find(b => b.id === currentBlockId)
    if (!block) return
    setCurrentIndex((prev) => (prev + 1) % block.images.length)
  }

  const prevImage = () => {
    const block = GALLERY_BLOCKS.find(b => b.id === currentBlockId)
    if (!block) return
    setCurrentIndex((prev) => (prev - 1 + block.images.length) % block.images.length)
  }

  return (
    <section id="prices" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Прайс-лист
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Актуальные цены на услуги
          </p>
          
        </div>

        {/* Сетка блоков (показываем только первые изображения) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {GALLERY_BLOCKS.map((block) => (
            <div key={block.id} className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 border-2 border-gray-600">
              <div className="text-center mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {block.title}
                </h3>
                {block.priceFrom !== undefined && (
                  <p className="text-yellow-400 font-semibold">от {block.priceFrom} рублей</p>
                )}
              </div>

              <div 
                className="relative aspect-square overflow-hidden rounded-2xl cursor-pointer group"
                onClick={() => openModal(block.id, 0)}
              >
                <img
                  src={block.images[0].src}
                  alt={block.images[0].alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
                
                {/* Счетчик изображений */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-2 py-1 rounded-md">
                  1 из {block.images.length}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PriceListModal 
        isOpen={isModalOpen}
        currentIndex={currentIndex}
        currentBlockId={currentBlockId}
        onClose={closeModal}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  )
}

export default PriceList
