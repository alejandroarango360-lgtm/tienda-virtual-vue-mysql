# 🛍️ Tienda Virtual - Proyecto Full Stack

Este es un proyecto completo de una tienda virtual construida desde cero, aplicando arquitectura **MVC** en el backend y utilizando **Vue.js** para el frontend.

## 🚀 Tecnologías Utilizadas

*   **Frontend:** Vue.js 3, Vite, Vue Router, Axios, Bootstrap 5.
*   **Backend:** Node.js, Express, Cors, Helmet, Dotenv.
*   **Base de Datos:** MySQL (mysql2/promise).
*   **Control de Versiones:** Git y GitHub.

## ✨ Características Principales

*   **Catálogo:** Visualización de productos consultados desde la base de datos en tiempo real.
*   **Carrito de Compras:** Los usuarios pueden agregar productos, ver el total a pagar y gestionar su compra.
*   **Procesamiento de Pedidos:** Al finalizar la compra, se registra el pedido y los detalles en MySQL utilizando **transacciones** para asegurar la integridad de los datos (y se descuenta el stock automáticamente).
*   **Panel de Administración (Básico):** Creación de nuevos productos y eliminación lógica de productos existentes.
*   **Arquitectura Limpia:** Separación de responsabilidades (Modelos, Controladores y Rutas) en el backend.

## 🛠️ Cómo ejecutar este proyecto localmente

Sigue estos pasos para probar el proyecto en tu computadora:

### 1. Base de Datos
1. Abre MySQL Workbench o tu gestor de MySQL preferido.
2. Ejecuta el archivo `tienda-virtual.sql` que se encuentra en la raíz de este repositorio. Esto creará la base de datos, las tablas y algunos datos de prueba.

### 2. Configurar el Backend
1. Abre una terminal y navega a la carpeta `backend`:
   ```bash
   cd backend
   Instala las dependencias:

bash
npm install
Crea un archivo llamado .env en la raíz de la carpeta backend basándote en el archivo .env.example (o crea el tuyo propio) y coloca tus credenciales de MySQL:

env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=tienda_virtual
Inicia el servidor:

bash
npm run dev
3. Configurar el Frontend
Abre una segunda terminal y navega a la carpeta frontend:

bash
cd frontend
Instala las dependencias:

bash
npm install
Inicia la aplicación:

bash
npm run dev
Abre tu navegador y visita http://localhost:5173.

Desarrollado como proyecto de curso.


5. Abajo de todo, en la sección **"Commit changes"**, deja seleccionada la opción **"Commit directly to the `main` branch"**.
6. Haz clic en el botón verde que dice **"Commit new file"** (o "Commit changes").
