## **Ecommerce API**
Esta API permite gestionar un sistema de ecommerce. Incluye operaciones CRUD para las entidades principales: users, products, categories, y orders. También integra documentación interactiva con Swagger.

**Tabla de Contenidos**

1.- [Características](#Características)

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

## **Características**

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

  ```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
  }
```


2.- Products

-  Crear un producto
-  Endpoint: /products
-  Método: POST
-  Cuerpo de la solicitud:

```
{
  "name": "Laptop",
  "description": "High-end gaming laptop",
  "price": 1500,
  "categoryId": 2
  }
```

-  Respuesta exitosa (Código 201):

````
{
  "id": 1,
  "name": "Laptop",
  "description": "High-end gaming laptop",
  "price": 1500,
  "categoryId": 2
   }
````

3. Categories

-  Obtener todas las categorías
-  Endpoint: /categories
-  Método: GET
-  Respuesta exitosa (Código 200):

````
[
  {
    "id": 1,
    "name": "Electronics"
  }
    ]
````

4. Orders

-  Crear un pedido
-  Endpoint: /orders
-  Método: POST
-  Cuerpo de la solicitud:
  
````
    {
  "userId": 1,
  "products": [
    { "productId": 1, "quantity": 2 }
  ]
    }
````

-  Respuesta exitosa (Código 201):
    ````
    {
  "id": 1,
  "userId": 1,
  "products": [
    { "productId": 1, "quantity": 2 }
  ]
    }
    ````


**Estructura del proyecto**

src/
├── controllers/     # Lógica de negocio
├── models/          # Modelos de la base de datos
├── routes/          # Definición de rutas
├── middlewares/     # Validaciones y middleware
├── config/          # Configuración de la base de datos y variables de entorno
├── docs/            # Documentación Swagger
├── app.js           # Configuración de la aplicación
└── server.js        # Punto de entrada
