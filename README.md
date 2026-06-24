# Portes y Mudanzas Manuel — Web Corporativa

Web publicada en: **https://[TU-USUARIO].github.io/mudanzas-manuel/**

---

## Cómo actualizar el número de teléfono

Busca `698 836 211` en estos archivos y reemplaza por el nuevo número:

- `index.html` → busca todas las apariciones de `34698836211` (formato internacional) y `698 836 211` (formato visible)
- `js/main.js` → línea 6: `const WA_NUMBER = '34698836211';`

En total hay que cambiar el número en **3 lugares**.

---

## Cómo cambiar un texto

Abre `index.html` con cualquier editor de texto (Bloc de notas, VS Code, etc.) y busca el texto que quieres cambiar.

Ejemplos:
- Título principal (H1): busca `Tu mudanza en Madrid`
- Subtítulo del hero: busca `Disponibles 365 días`
- Textos de servicios: busca el nombre del servicio, p.ej. `Mudanzas locales`

---

## Cómo añadir una foto real

1. Copia la foto a la carpeta `images/` (formatos recomendados: `.webp`, `.jpg`)
2. Nómbrala de forma descriptiva, ej: `furgoneta-mudanzas.jpg`
3. En `index.html`, añade la imagen donde quieras con este código:

```html
<img src="images/furgoneta-mudanzas.jpg" 
     alt="Furgoneta de Portes y Mudanzas Manuel" 
     width="800" height="600" 
     loading="lazy">
```

---

## Cómo publicar cambios

Desde la carpeta del proyecto, ejecuta:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Los cambios aparecerán en la web en 1-2 minutos.

---

## Checklist de cosas pendientes

- [ ] Añadir fotos reales de la furgoneta y de mudanzas en acción
- [ ] Registrar dominio propio (recomendado: `mudanzasmanuel.es` en dondominio.com ~10€/año)
- [ ] Conectar dominio propio a GitHub Pages (en Settings → Pages → Custom domain)
- [ ] Crear perfil Google Business gratis en business.google.com (aparece en Google Maps)
- [ ] Instalar Google Analytics (gratuito) para ver cuántas visitas recibe la web
- [ ] Actualizar el placeholder de canonical URL en `index.html` con el dominio real

---

## Estructura de archivos

```
mudanzas-app/
├── index.html        ← Toda la web (HTML + estructura)
├── css/
│   └── styles.css    ← Todo el diseño y estilos
├── js/
│   └── main.js       ← Interacciones (formulario, animaciones)
├── images/
│   └── (aquí van las fotos)
└── README.md         ← Este archivo
```

---

## Soporte técnico

Si necesitas ayuda con la web, puedes:
1. Editar los archivos directamente desde GitHub.com (botón lápiz en cada archivo)
2. Contratar a un desarrollador web para cambios mayores
3. Usar el repositorio de GitHub para guardar historial de cambios

© 2025 Portes y Mudanzas Manuel
