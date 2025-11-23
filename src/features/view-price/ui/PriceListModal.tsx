import Modal from '../../../shared/ui/Modal'
import Button from '../../../shared/ui/Button'
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '../../../shared/ui/Icons'
import { useImageLoader } from '../lib/hooks/useImageLoader'
import type { PriceListModalProps } from '../lib/types'

function PriceListModal({ isOpen, currentIndex, currentBlockId, onClose, onNext, onPrev }: PriceListModalProps) {
  const { imageLoaded, setImageLoaded, currentBlock, totalInBlock } = useImageLoader(
    currentBlockId,
    currentIndex,
    isOpen
  )

  if (!currentBlock) return <></>

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Button
        variant="close"
        size="md"
        onClick={onClose}
        className="absolute top-6 right-6 z-20 shadow-lg"
      >
        <CloseIcon />
      </Button>

      <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-3xl p-4 shadow-2xl border border-white/10">
        <div className="relative flex items-center justify-center">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin"></div>
            </div>
          )}
          
          <img
            src={currentBlock.images[currentIndex].src}
            alt={currentBlock.images[currentIndex].alt}
            className={`rounded-2xl transition-all duration-500 object-contain mx-auto 
              w-[90vw] h-[70vh] sm:w-[85vw] sm:h-[70vh] lg:w-[1100px] lg:h-[700px] ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="inline-flex items-center px-4 py-2 bg-black/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
              <svg className="w-4 h-4 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-white font-medium text-sm">
                <span className="text-yellow-400 font-bold">{currentIndex + 1}</span>
                <span className="text-white/70 mx-1">из</span>
                <span className="text-white/90">{totalInBlock}</span>
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="icon"
          size="lg"
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 shadow-xl group"
        >
          <ChevronLeftIcon className="group-hover:-translate-x-1 transition-transform duration-300" />
        </Button>

        <Button
          variant="icon"
          size="lg"
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 shadow-xl group"
        >
          <ChevronRightIcon className="group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </Modal>
  )
}

export default PriceListModal