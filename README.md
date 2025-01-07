## **ECOMMERCE API**
Esta API permite gestionar un sistema de ecommerce. Incluye operaciones CRUD para las entidades principales: users, products, categories, y orders. También integra documentación interactiva con Swagger.

**Tabla de Contenidos**

1.- [Características](#Características)

2.- [Requisitos](#Requisitos)

3.- [Instalación](#Instalación)

4.- [Uso](#Uso)

5.- [Documentación con Swagger](#Documentación)

6.- [Endpoints](#Endpoints)

-  Users
-  Products
-  Categories
-  Orders
-  OrderDetails

## **Características**

-  CRUD completo para las entidades principales:
    - **Users:** Gestión de usuarios.
    - **Products:** Gestión de productos.
    - **Categories:** Organización de productos por categorías.
    - **Orders:** Gestión de pedidos.
    - **OrderDetails** Gestión de detalle de pedidos.

-  Manejo de autenticación con JWT.

-  Testing unitario e integral de la api.

-  Gestion de roles: Admin / User

-  Documentación automática con Swagger.

-  Manejo de errores estándar.

-  Respuestas en formato JSON.

## **Requisitos**

-  Node.js 16+
-  npm
-  Base de datos PostgreSQL

## **Instalación**

1.- Clona este repositorio:
    
    git clone <URL_DEL_REPOSITORIO>
    cd ecommerce-api

2.- Instala las dependencias:

    npm install

3.- Configura las variables de entorno en un archivo .env:

    DB_DATABASE=example
    DB_HOST=example
    DB_PORT=example
    DB_USERNAME=example
    DB_PASSWORD=example
    CLOUDINARY_NAME=example
    CLOUDINARY_API_KEY=example
    CLOUDINARY_API_SECRET=example
    JWT_SECRET= example
    ADMIN_EMAIL=example
    ADMIN_PASSWORD=example
   

4.- Inicia la aplicacion

    npm start

## **Uso**

La API puede probarse mediante herramientas como **Postman, thunder client, Insomnia** o directamente desde la interfaz de **Swagger**.
Ejemplo:

    GET http://localhost:3000/products

## **Documentación con Swagger**

La API incluye una documentación interactiva generada con Swagger. Una vez que la aplicación esté en ejecución, accede a:

    http://localhost:3000/API

Allí encontrarás ejemplos de solicitudes, respuestas y una interfaz para probar los endpoints directamente.

## **Endpoints**

**Base URL:**

    http://localhost:3000/API

**1. USERS**

**Endpoints Users**
-  GET  /users
-  GET  /users/:ID
-  PUT  /users/:ID
-  DELETE  /users/:ID
  
**Ejemplo: Obtener un usuario por Id**
-  **Endpoint:** /users/:Id
-  **Método:** GET
-  **Respuesta exitosa (Código 200):**

  ```
{
      "id": "string",
    "name": "string",
    "email": "string",
    "password": "string",
    "phone": 0,
    "country": "string",
    "address": "string",
    "city": "string",
    "orders": [],
    "isAdmin": false
  }
```
**2.- AUTH**

**Endpoints Products**
-  POST  /auth/signup
-  POST  /auth/signin

**Ejemplo: Crear un usuario**
-  **Endpoint:** /auth/signup
-  **Método:** POST
-  **Cuerpo de la solicitud:**
````
{
  "name": "Fabiana Gomez",
  "email": "example@gmail.com",
  "password": "Example%123",
  "confirmPassword": "Example%123",
  "address": "Av. los heroes 152",
  "phone": 0,
  "city": "Cusco",
  "country": "Peruana"
}
````
-  **Respuesta exitosa (Código 201):**
````
{
         "id": "string",
        "name": "Fabiana Gomez",
          "email": "example@gmail.com",
          "password": "Example%123",
        "phone": 0,
        "country": "Peruana",
        "address": "Av. los heroes 152",
        "city": "Cusco",
        "orders": [],
        "isAdmin": false
  }
````

**3.- PRODUCTS**

**Endpoints Products**
-  GET  /products
-  GET  /products/:ID
-  POST  /products
-  PUT  /products/:ID
-  DELETE  /products/:ID
  
**Ejemplo: Crear un producto**
-  **Endpoint:** /products
-  **Método:** POST
-  **Cuerpo de la solicitud:**

```
{
  "name": "string",
  "description": "string",
  "price": 25.9,
  "stock": 15,
  "imgUrl": "https://cdn-icons-png.flaticon.com/512/5115/5115607.png",
  "categories": "string"
  }
```

-  **Respuesta exitosa (Código 201):**

````
{
  "id": 1,
  "name": "string",
  "description": "string",
  "price": 25.9,
  "stock": 15,
  "imgUrl": "https://cdn-icons-png.flaticon.com/512/5115/5115607.png",
  "categoryId": 2
   }
````

**4. CATEGORIES**

**Endpoints Categories**
-  GET  /categories
-  POST  /categories

**Ejemplo: Obtener todas las categorías**
-  **Endpoint:** /categories
-  **Método:** GET
-  **Respuesta exitosa (Código 200):**

````
[
  {
    "id": "string",
    "name": "string",
    "products": []
  },{
    "id": "string",
    "name": "string",
    "products": []
    }
]
````

**5. ORDERS**

**Endpoints Orders**
-  GET  /orders
-  GET  /orders/:ID
-  POST  /orders
  
**Ejemplo: Crear un pedido**
-  **Endpoint:** /orders
-  **Método:** POST
-  **Cuerpo de la solicitud:**
  
````
    {
  "userId": "\"id\":\"20ede140-c53e-4b0b-858a-abc19cc6e514\"",
  "products": [
    {
      "id": "60ede140-c53e-4b0b-858a-abc19cc6e514"
    }
  ]
}

````

-  **Respuesta exitosa (Código 201):**
  
````
    {
  "id": "string",
  "user": "string",
  "date": "2024-12-31T23:39:07.228Z",
  "orderDetails": {}
  }
````

**6. ORDERDETAILS**

**Endpoints OrderDetails**
-  GET  /OrderDetails
-  GET  /OrderDetails/:ID
-  POST  /OrderDetails
  
**Ejemplo: Obtener un detalle de pedido**
-  **Endpoint:** /OrderDetails/:id
-  **Método:** GET
-  **Respuesta exitosa (Código 200):**
```
{
    "id": "string",
    "price": 0,
    "order": "string",
    "products": []
}
````

**7. FILES**

**Endpoints Files**
-  POST  /files/uploadImage/:ID
