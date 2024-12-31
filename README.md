# **Ecommerce API**
Esta API permite gestionar un sistema de ecommerce. Incluye operaciones CRUD para las entidades principales: users, products, categories, y orders. También integra documentación interactiva con Swagger.

**Tabla de Contenidos**

1.- Características

2.- Requisitos

3.- Instalación

4.- Uso

5.- Documentación con Swagger

6.- Endpoints

-  Users
-  Products
-  Categories
-  Orders

7.- Estructura del Proyecto

**Características**

-  CRUD completo para las entidades principales:
-  Users: Gestión de usuarios.
-  Products: Gestión de productos.
-  Categories: Organización de productos por categorías.
-  Orders: Gestión de pedidos.

-  Manejo de autenticación con JWT (opcional).

-  Documentación automática con Swagger.

-  Manejo de errores estándar.

-  Respuestas en formato JSON.

**Requisitos**

-  Node.js 16+
-  npm o yarn
-  Base de datos PostgreSQL

**Instalación**

1.- Clona este repositorio:
    
    git clone <URL_DEL_REPOSITORIO>
    cd ecommerce-api

2.- Instala las dependencias:

    npm install

3.- Configura las variables de entorno en un archivo .env:

    PORT=3000
    DATABASE_URL=postgres://usuario:contraseña@localhost:5432/ecommerce
    JWT_SECRET=mi_secreto

4.- Inicia la aplicacion

    npm start

**Uso**

La API puede probarse mediante herramientas como Postman, thunder client, Insomnia o directamente desde la interfaz de Swagger.
Ejemplo:

    GET http://localhost:3000/api/products

**Documentación con Swagger**

La API incluye una documentación interactiva generada con Swagger. Una vez que la aplicación esté en ejecución, accede a:

    http://localhost:3000/API

Allí encontrarás ejemplos de solicitudes, respuestas y una interfaz para probar los endpoints directamente.

**Endpoints**

Base URL:

    http://localhost:3000/API

1. Users

-  Crear un usuario

-  Endpoint: /users

-  Método: POST

-  Cuerpo de la solicitud:

````{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
   }
