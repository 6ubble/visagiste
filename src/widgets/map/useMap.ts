import { useState, useRef, useEffect } from 'react'
import { CONTACT_INFO } from './constants'

declare global {
  interface Window {
    ymaps?: any
  }
}

export const useMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    const loadYandexMap = async () => {
      try {
        if (window.ymaps) {
          initMap()
          return
        }

        const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]')
        if (existingScript) {
          existingScript.addEventListener('load', () => {
            if (window.ymaps) {
              window.ymaps.ready(initMap)
            }
          })
          return
        }

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
          center: CONTACT_INFO.coordinates,
          zoom: 16,
          controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
        }, {
          searchControlProvider: 'yandex#search'
        })

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
          iconColor: '#fbbf24'
        })

        map.geoObjects.add(placemark)
        setIsMapLoaded(true)

      } catch (error) {
        console.error('Ошибка инициализации карты:', error)
        setMapError(true)
      }
    }

    loadYandexMap()

    return () => {
      const existingScript = document.querySelector('script[src*="api-maps.yandex.ru"]')
      if (existingScript) {
        existingScript.removeEventListener('load', () => {})
      }
    }
  }, [])

  return {
    mapRef,
    isMapLoaded,
    mapError
  }
}