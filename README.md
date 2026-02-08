# Mis XV - Milagros Cabrera 🎉

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

Invitación digital elegante y moderna para el cumpleaños de 15 de Milagros Cabrera.

## Características

- ✨ Diseño elegante con tema bordeaux y negro
- ⏱️ Cuenta regresiva en tiempo real
- 📍 Integración con Google Maps
- 🎵 Playlist de Spotify embebida
- 📸 Galería de fotos
- 📱 100% responsive (móvil y desktop)
- ♿ Accesible (ARIA labels, navegación por teclado)

## Requisitos Previos

- Node.js (versión 18 o superior)
- Cuenta de GitHub

## Configuración Local

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Ejecuta el proyecto localmente:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`

## Despliegue en GitHub Pages

### Paso 1: Compilar y Desplegar

Ejecuta el siguiente comando para construir y desplegar automáticamente:

```bash
npm run deploy
```

Este comando:
- Compila el proyecto
- Crea la rama `gh-pages`
- Sube los archivos al repositorio

### Paso 2: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: https://github.com/Sebasm2kuy/Milu15
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **Source**, selecciona la rama `gh-pages` y la carpeta `/ (root)`
5. Haz clic en **Save**

Tu sitio estará disponible en: **https://Sebasm2kuy.github.io/Milu15/**

### Solución de Problemas

**Si el comando `npm run deploy` falla:**

1. Verifica que tengas permisos en el repositorio
2. Asegúrate de que el remote esté configurado:
   ```bash
   git remote -v
   ```
3. Si es necesario, actualiza el remote:
   ```bash
   git remote set-url origin https://github.com/Sebasm2kuy/Milu15.git
   ```


## Cambios Recientes

✅ Removido: Google Gemini AI (reduce tamaño del bundle)
✅ Simplificado: Sección de música (solo Spotify embed)
✅ Actualizado: Galería de fotos mejorada
✅ Optimizado: Tamaño del bundle (67KB gzip, antes 121KB)

## Personalización

### Cambiar Datos del Evento

Edita las constantes en `App.tsx`:

```typescript
const EVENT_DATE = new Date('2026-08-22T21:00:00');
const WHATSAPP_NUMBER = "59895239386";
const EVENT_ADDRESS = "Granaderos 3875, 12300 Montevideo";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/...";
```

### Cambiar Fotos

Reemplaza las imágenes en `public/photos/`:
- `milu-vestido.jpg`
- `milu-patinando.jpg`
- `milu-camara.jpg`

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Compilar para producción
- `npm run preview` - Previsualizar compilación
- `npm run deploy` - Desplegar a GitHub Pages

## Tecnologías

- React 19 + TypeScript
- Vite + Tailwind CSS
- Spotify Web Embed
- Google Maps Embed
- gh-pages

---

**Desarrollado con ❤️ para los XV de Milagros**