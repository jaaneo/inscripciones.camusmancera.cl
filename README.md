# 🎶 Campamento Musical Marqués de Mancera - Inscripciones

Este proyecto es una aplicación web para gestionar las inscripciones de la trigésima versión del **Campamento Musical Marqués de Mancera**. Está diseñado para ser intuitivo, visualmente atractivo y funcional, permitiendo a los participantes registrar sus datos y recibir confirmaciones vía correo electrónico.

## 🚀 Características

- **Formulario dinámico y validación en tiempo real**:  
  - Formateo y validación del RUT chileno.  
  - Validación de campos obligatorios.  
  - Bordes de colores en los campos (verde para válido, rojo para errores).  

- **Notificaciones**:  
  - Modal de confirmación tras enviar el formulario.  
  - Correo de confirmación personalizado para los inscritos usando **EmailJS**.  

- **Diseño atractivo**:  
  - Fondo animado con emojis de notas musicales e instrumentos flotando.  
  - Gradiente de colores vibrantes.  
  - Completamente responsivo.  

- **Backend conectado a Supabase**:  
  - Almacena las inscripciones en una base de datos segura y escalable.  

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**:  
  - [React](https://reactjs.org/) con TypeScript.  
  - [Tailwind CSS](https://tailwindcss.com/) para el diseño.  

- **Backend**:  
  - [Supabase](https://supabase.com/) como base de datos.  

- **Servicios adicionales**:  
  - [EmailJS](https://www.emailjs.com/) para envío de correos automáticos.  

- **Hosting**:  
  - [Vercel](https://vercel.com/) para despliegue rápido y sencillo.  

---

## 📂 Estructura del Proyecto

```plaintext
campamento-musical/
├── public/               # Archivos públicos (favicon, index.html)
├── src/
│   ├── assets/           # Imágenes y recursos estáticos
│   ├── components/       # Componentes React (Formulario, Footer, etc.)
│   ├── App.tsx           # Componente principal
│   ├── index.tsx         # Entrada del proyecto
│   ├── supabaseClient.ts # Configuración de Supabase
│   └── styles/           # Estilos globales
├── README.md             # Este archivo
├── package.json          # Dependencias y scripts
└── tailwind.config.js    # Configuración de Tailwind CSS
