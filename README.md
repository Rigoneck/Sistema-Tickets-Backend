Sistema de Tickets - Backend

Descripción

Backend del Sistema de Gestión de Tickets desarrollado con Node.js, Express y MongoDB.

Este proyecto proporciona una API REST encargada de la autenticación de usuarios, gestión de tickets, administración de datos y comunicación con la base de datos MongoDB.

Tecnologías Utilizadas

* Node.js
* Express
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Bcrypt
* Multer
* Dotenv
* Nodemon

Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

* Node.js
* npm
* MongoDB local o una instancia en MongoDB Atlas

Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/Rigoneck/Sistema-Tickets-Backend.git
```

2. Ingresar al directorio del proyecto

```bash
cd Sistema-Tickets-Backend
```

3. Instalar las dependencias

```bash
npm install
```

4. Configurar las variables de entorno

Crear un archivo `.env` tomando como referencia el archivo `.env.example`.

Ejemplo:

```env
PORT=4000

MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database

JWT_SECRET=mi_clave_secreta
```

5. Ejecutar el servidor en modo desarrollo

```bash
npm run dev
```

Estructura del Proyecto

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
└── index.js
```

Dependencias Principales

* Express: Framework para la creación de la API REST.
* Mongoose: ODM para la conexión y gestión de MongoDB.
* JWT: Implementación de autenticación basada en tokens.
* Bcrypt: Encriptación y validación de contraseñas.
* Multer: Gestión de carga de archivos.
* Dotenv: Manejo de variables de entorno.
* Nodemon: Reinicio automático del servidor durante el desarrollo.

Funcionalidades

* Registro de usuarios.
* Inicio de sesión.
* Autenticación mediante JWT.
* Gestión de tickets.
* Conexión con MongoDB.
* Manejo de archivos adjuntos.

