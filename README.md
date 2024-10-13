# ShoeAdev E-commerce

## Descripción

El **ShoeAdev E-commerce** es una plataforma diseñada para la venta de ropa en línea, ofreciendo tanto una experiencia de compra para los clientes como un panel de administración para los administradores. Este sistema cuenta con funcionalidades avanzadas como la gestión de productos, pedidos, usuarios y categorías. Además, integra diversas herramientas para autenticación, pagos, y análisis de datos, brindando una experiencia de usuario optimizada y segura.

## Características

- **Autenticación con Kinde**: Utiliza Google y GitHub para un inicio de sesión sencillo y seguro.
- **Prisma ORM con PostgreSQL**: Conexión eficiente con Neon PostgreSQL para la gestión de productos, usuarios, pedidos y más.
- **Redis para el Carrito de Compras**: Almacenamiento rápido y escalable del carrito de compras mediante Upstash Redis.
- **Manejo de Imágenes con UploadThing**: Carga y gestión de imágenes para productos.
- **Integración de Pagos con Stripe**: Pagos seguros a través de Stripe.
- **Formularios Validados con Zod**: Validación de formularios mediante `Zod`
- **Gráficos y Análisis con Recharts**: Visualización de datos y estadísticas del comercio.
- **Componentes UI con ShadCN**: Componentes reutilizables y estilizados.
- **Categorías de Productos con Enum**: Los productos están clasificados en las categorías `kids`, `women`, `men`.
- **conform guide**: Asegura las acciones del servidor para evitar vulnerabilidades.
- **Uso de `useFormState` y `useFormStatus`**: Manejo de formularios con estado eficiente.

## Instalación

Sigue los pasos a continuación para instalar y configurar el proyecto en tu entorno local:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/BMancilla23/nextjs-ecommerce-shoeadev.git
   ```

2. **Navega al directorio del proyecto**:

   ```bash
   cd shoeadev-ecommerce
   ```

3. **Instala las dependencias**

   ```bash
   npm install
   ```

4. **Configura las variables de entorno copiando el archivo de ejemplo `.env.example` a `.env`**

   ```bash
   cp .env.example .env
   ```

5. **Ejecuta las migraciones para preparar la base de datos**

   ```bash
   npx prisma migrate dev
   ```

6. **Iniciar el servidor de de desarrollo**

   ```bash
   npm run dev
   ```

## Vista previa del proyecto

### Login

![Vista de login](/docs/images/login.png)

### Home

![Vista de home](/docs/images/home.png)

### Dashboard

![Vista de dashboard](/docs/images/dashboard.png)

### Products

![Vista de products](/docs/images/products.png)

### Product

![Vista de product](/docs/images/product.png)

### Payment

![Vista de payment](/docs/images/payment.png)

## Pruebas Unitarias

Las pruebas unitarias están diseñadas para garantizar el correcto funcionamiento de los endpoints de la API. Para ejecutarlas, utiliza el siguiente comando:

```bash
npm run test
```

## Licencia

Este proyecto está licenciado bajo la Licencia [MIT](URL_DE_LICENCIA).
