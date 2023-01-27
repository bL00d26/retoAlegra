# Restaurante Microservicios

Sistema encargado de la creación, ejecución y finalización de órdenes para un restaurante que realiza una jornada de almuerzos gratis, pudiendo recibir muchas solicitudes en simultáneo y basado en una arquitectura de microservicios.

![Arquitectura](https://martin-perez-p-cloud-practitioner-us-east-1.s3.amazonaws.com/architecture.png)


## Instalación y Ejecución del Proyecto
```bash
  git clone https://github.com/bL00d26/retoAlegra
  cd retoAlegra
  docker-compose build
  docker-compose up
```

## Tecnologías empleadas

- **Docker:** Runtime para la generación de los contenedores.
- **Docker Compose:** Orquestador de contenedores de Docker.
- **Kafka:** Broker para comunicar a los microservicios.
- **Redis:** Caché y servidor para la cola.
- **BullMQ:** Cola para procesar las órdenes.
- **React:** Librería para el frontend.
- **Redux:** Manejo de estado en el frontend.
- **MongoDB:** Base de datos NoSQL.
- **SocketIO:** Comunicación entre el backend y frontend en tiempo real.
- **Nginx:** Proxy reverso para los microservicios y el frontend. 
- **NodeJS:** Entorno de ejecución para Javascript.


## Pantallas

### Orders Page
En esta página podemos ver las órdenes en preparación y las ordenes finalizadas, así como solicitar una nueva orden, los cambios se verán reflejados en tiempo real debido a los sockets.

![OrdersPage](https://martin-perez-p-cloud-practitioner-us-east-1.s3.amazonaws.com/orderspage.png)

### Recipes Page
En esta página podemos ver las recetas de la cocina, al hacer click a un elemento de la tabla podemos ver el detalle de los ingredientes y las cantidades que requiere cada una.

![RecipesPage](https://martin-perez-p-cloud-practitioner-us-east-1.s3.amazonaws.com/recipespage.png)

### Ingredients Page
En esta página podemos ver los ingredientes en la bodega de alimentos así como sus cambios en stock en tiempo real debido a los sockets según se realizan las compras y se preparan las órdenes.

![IngredientsPage](https://martin-perez-p-cloud-practitioner-us-east-1.s3.amazonaws.com/ingredientspage.png)

### BuyRecords Page
En esta página podemos ver el historial de compras a la plaza de alimentos, la cantidad comprada y el ingrdiente comprado así como la fecha y hora.

![BuyRecordsPage](https://martin-perez-p-cloud-practitioner-us-east-1.s3.amazonaws.com/buyorderspage.png)


## Demo

[LINK DEMO](http://ec2-54-160-77-35.compute-1.amazonaws.com/)