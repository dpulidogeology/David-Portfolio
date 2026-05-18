# David F. Pulido - Portfolio

Sitio web de portafolio personal construido con React y Vite con soporte multi-idioma.

## Stack Tecnológico

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 6.2.0
- **TypeScript**: 5.8.2
- **Email**: @emailjs/browser para contacto
- **Geolocalización**: Detección automática de ubicación por IP

## Características

✨ **Detección Automática de Idioma por Geolocalización**

El sitio detecta automáticamente tu ubicación basado en tu IP y muestra el idioma correspondiente:

| País/Región | Idioma |
|---|---|
| Colombia, Latinoamérica, España | Español (ES) |
| Francia | Francés (FR) |
| Alemania, Austria, Suiza | Alemán (DE) |
| Otros países | Inglés (EN) |

**Cambio Manual de Idioma**
- Puedes cambiar manualmente el idioma con los botones EN/ES/FR/DE en la esquina superior derecha
- El idioma seleccionado se mantiene durante toda la sesión

## Requisitos

- Node.js (versión recomendada: 16+)
- npm o yarn

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Crea un archivo `.env` en la raíz del proyecto con:
```
GEMINI_API_KEY=tu_clave_aqui
```

## Desarrollo

Para ejecutar el servidor de desarrollo:
```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000` (o el siguiente puerto disponible)

## Build

Para compilar para producción:
```bash
npm run build
```

Los archivos compilados se generan en la carpeta `docs/`

## Preview

Para previsualizar la build:
```bash
npm run preview
```

## Estructura del Proyecto

- `components/` - Componentes React reutilizables
- `contexts/` - Contextos React (LanguageContext)
- `assets/` - Imágenes y archivos estáticos
- `docs/` - Build de producción
- `App.tsx` - Componente raíz
- `index.tsx` - Punto de entrada
- `translations.ts` - Definiciones de idiomas (ES/EN/FR/DE)

## Idiomas Soportados

- **Español (ES)** - Español, España; Colombia, Argentina, Brasil, Chile, Ecuador, Perú, Venezuela, Bolivia, Paraguay, Uruguay, Costa Rica, Cuba, República Dominicana, El Salvador, Guatemala, Honduras, México, Nicaragua, Panamá, Puerto Rico
- **Inglés (EN)** - Por defecto para otros países
- **Francés (FR)** - Francia
- **Alemán (DE)** - Alemania, Austria, Suiza

## Deployment

El sitio está configurado para servirse desde GitHub Pages usando la carpeta `docs/`.

La detección automática de idioma funciona correctamente en producción mediante la API de geolocalización por IP.





