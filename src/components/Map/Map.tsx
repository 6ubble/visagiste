import { useState, useRef, useEffect } from 'react'
import { CONTACT_INFO } from './constants'

declare global {
  interface Window {
    ymaps?: any
  }
}

function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    const loadYandexMap = async () => {
      try {
        // Проверяем, загружен ли уже API Яндекс.Карт
        if (window.ymaps) {
          initMap()
          return
        }

        // Проверяем, не загружается ли уже скрипт
        const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]')
        if (existingScript) {
          // Если скрипт уже есть, ждем его загрузки
          existingScript.addEventListener('load', () => {
            if (window.ymaps) {
              window.ymaps.ready(initMap)
            }
          })
          return
        }

        // Загружаем API Яндекс.Карт
        const script = document.createElement('script')
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=&lang=ru_RU'
        script.async = true
        
        script.onload = () => {
          if (window.ymaps) {
            window.ymaps.ready(initMap)
          }
        }
        
        script.onerror = () => {
          console.error('Ошибка загрузки Яндекс.Карт')
          setMapError(true)
        }
        
        document.head.appendChild(script)
      } catch (error) {
        console.error('Ошибка при загрузке карты:', error)
        setMapError(true)
      }
    }

    const initMap = () => {
      if (!mapRef.current || !window.ymaps) return

      try {
        const map = new window.ymaps.Map(mapRef.current, {
          center: CONTACT_INFO.coordinates, // [широта, долгота]
          zoom: 16,
          controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
        }, {
          searchControlProvider: 'yandex#search'
        })

        // Добавляем метку на карту
        const placemark = new window.ymaps.Placemark(CONTACT_INFO.coordinates, {
          balloonContent: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #333; font-size: 16px; font-weight: bold;">
                ${CONTACT_INFO.businessName}
              </h3>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                📍 ${CONTACT_INFO.fullAddress}
              </p>
              <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                📞 <a href="tel:${CONTACT_INFO.phone}" style="color: #007bff; text-decoration: none;">
                  ${CONTACT_INFO.phone}
                </a>
              </p>
            </div>
          `,
          hintContent: CONTACT_INFO.businessName
        }, {
          preset: 'islands#redDotIcon',
          iconColor: '#fbbf24' // Желтый цвет в тон сайта
        })

        map.geoObjects.add(placemark)
        setIsMapLoaded(true)

      } catch (error) {
        console.error('Ошибка инициализации карты:', error)
        setMapError(true)
      }
    }

    loadYandexMap()

    // Очистка при размонтировании компонента
    return () => {
      // Удаляем обработчики событий, если они были добавлены
      const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]')
      if (existingScript) {
        existingScript.removeEventListener('load', () => {})
      }
    }
  }, [])

  return (
    <section id="map" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Как меня найти
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Расположение салона
          </p>
        </div>

        <div className="w-full">
          {/* Карта */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 border-2 border-gray-600">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gray-700 shadow-xl">
              {!mapError ? (
                <>
                  <div ref={mapRef} className="w-full h-full" />
                  {!isMapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 rounded-2xl">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-sm">Загружаем карту...</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                    </svg>
                    <p className="text-gray-300 mb-4">Карта временно недоступна</p>
                    <a 
                      href={`https://yandex.ru/maps/?text=${encodeURIComponent(CONTACT_INFO.fullAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-400/30"
                    >
                      Открыть в Яндекс.Картах
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Map