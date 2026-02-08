# Guía Rápida de Despliegue en GitHub Pages

## Opción 1: Despliegue Automático (Recomendado)

Simplemente ejecuta:

```bash
npm run deploy
```

Esto compilará y subirá automáticamente tu sitio a GitHub Pages.

## Opción 2: Despliegue Manual

Si prefieres hacerlo paso a paso:

1. **Compilar el proyecto:**
   ```bash
   npm run build
   ```

2. **Instalar gh-pages (si no está instalado):**
   ```bash
   npm install -D gh-pages
   ```

3. **Desplegar:**
   ```bash
   npx gh-pages -d dist
   ```

## Configurar GitHub Pages

Después de desplegar, ve a tu repositorio en GitHub:

1. **Settings** → **Pages**
2. En **Source**, selecciona la rama **gh-pages**
3. Carpeta: **/ (root)**
4. Guarda los cambios

Tu sitio estará en: `https://Sebasm2kuy.github.io/Milu15/`


## Actualizar el Sitio

Cada vez que hagas cambios:

```bash
npm run deploy
```

Los cambios se verán reflejados en unos minutos.

## Solución de Problemas Comunes

### Error: Permission denied

Verifica que tienes permisos de escritura en el repositorio.

### Error: remote origin already exists

```bash
git remote remove origin
git remote add origin https://github.com/Sebasm2kuy/Milu15.git
```

### La página muestra 404

Asegúrate de que GitHub Pages esté configurado con la rama `gh-pages`.

### Los estilos no se cargan

Verifica que `base: '/Milu15/'` esté en `vite.config.ts` y que `homepage` esté en `package.json`.