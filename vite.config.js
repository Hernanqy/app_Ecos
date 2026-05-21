import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ecos de la Máxima',
        short_name: 'Ecos',
        description: 'Actividad interactiva de búsqueda en el Polo Educativo La Máxima',
        theme_color: '#2f5d3a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ]
      },
      includeAssets: [
        'favicon.svg',
        'icons.svg',
        'fondo.jpg',
        'personaje.png',
        'portada-bosque.png',
        'sonidos/logro.mp3',
        'sonidos/correcto.mp3',
        'sonidos/qr.mp3'
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,mp3}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      }
    })
  ]
})