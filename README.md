# 🧬 Nutrabiotics App

Nutrabiotics es una aplicación móvil desarrollada con React Native + Expo, que utiliza Firebase para la autenticación de usuarios y gestión de registros, y Firestore para el almacenamiento en tiempo real. Implementa hooks para el manejo eficiente de estados y local storage para la persistencia de datos, asegurando una experiencia de usuario fluida y rápida.

---

## 🏗️ Tipo de arquitectura

Este proyecto utiliza una arquitectura **modular basada en funcionalidades**, comúnmente conocida como **Type-Feature Architecture**.

En este enfoque:

- El código está dividido por **funcionalidad principal** (como `login`, `register`, `favorite`).
- Dentro de cada funcionalidad, el código se agrupa por **tipo de archivo**: `components`, `screens`, `services`, `hooks`, etc.
- Esta estructura modular proporciona una base sólida y escalable, permitiendo mantener el proyecto ordenado a medida que crece.

---

## 🧪 Tecnologías principales

- [Expo]
- [React Native] 0.76.9
- [TypeScript]
- [Firebase]
- [React Navigation]
- [AsyncStorage]
- [Axios]

---

### Requisitos previos

- Node.js `>=18.x`
- Yarn o npm
- Expo CLI → instalar con:

```bash
npm install -g expo-cli
```

### Correr Proyecto

1 clonar proyecto

```bash
git clone https://github.com/yoryi/NUTRABIOTICS
cd nutrabiotics
```

2 Instala las dependencias

```bash
npm install
```

3 Implementar archivo .env

```bash
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=..
FIREBASE_STORAGE_BUCKET=..
FIREBASE_MESSAGING_SENDER_ID=..
FIREBASE_APP_ID=..
```

4 iniciar proyecto

```bash
npm run start
# o con Yarn
yarn start

```

5 También puedes usar estos comandos para compilar y ejecutar la aplicación

```bash
expo run:ios
expo run:android
```

### Vista Previa App

![Vista previa de la app](https://i.ibb.co/d0z6FhtV/Captura-de-pantalla-2025-04-14-a-la-s-4-04-49-a-m.png)

