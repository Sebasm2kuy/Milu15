# Mis XV - Milagros Cabrera 🎉

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

Invitación digital elegante y moderna para el cumpleaños de 15 de Milagros Cabrera.

## Características

- ✨ Diseño elegante con tema bordeaux y negro
- ⏱️ Cuenta regresiva en tiempo real
- 📍 Integración con Google Maps
- 🎵 Búsqueda de canciones con IA (Gemini)
- 📸 Cápsula de recuerdos con análisis de fotos por IA
- 📱 100% responsive (móvil y desktop)
- ♿ Accesible (ARIA labels, navegación por teclado)

## Requisitos Previos

- Node.js (versión 18 o superior)
- Cuenta de GitHub
- API Key de Google Gemini (para funcionalidades de IA)

## Configuración Local

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Configura las variables de entorno:**
   - Copia el archivo `.env.example` a `.env`
   - Obtén tu API key de Gemini en: https://aistudio.google.com/apikey
   - Agrega tu API key en el archivo `.env`:
     ```
     GEMINI_API_KEY=tu_api_key_aqui
     ```

3. **Ejecuta el proyecto localmente:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

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

**Sobre las funcionalidades de IA:**

Por seguridad, NO subas tu API key al repositorio. Las funcionalidades de IA (búsqueda de música y análisis de fotos) funcionarán SOLO localmente a menos que uses una solución serverless como Vercel o Netlify.

## Personalización

### Cambiar Datos del Evento

Edita las constantes en `App.tsx`:

```typescript
const EVENT_DATE = new Date('2026-08-22T21:00:00');
const WHATSAPP_NUMBER = "59895239386";
const EVENT_ADDRESS = "Granaderos 3875, 12300 Montevideo";
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
- Google Gemini AI
- gh-pages

---

**Desarrollado con ❤️ para los XV de Milagros**