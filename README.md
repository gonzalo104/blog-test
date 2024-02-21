# Modo Producción
 app: https://app-blog-test.onrender.com<br>
 api: https://api-blog-80y0.onrender.com/api/v1<br>
 swagger: https://api-blog-80y0.onrender.com/api/v1/docs

# Modo Local

## Rest API
### Entrar al folder api-blog
```bash
cd api-blog
```
### Crear Archivo .env con las siguientes variables
```bash
PORT=3001
NODE_ENV=development
POSTGRES_HOST=example-test.3123DSDS.us-east-1.rds.amazonaws.com
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=example_password
POSTGRES_DATABASE=example-db
```

### Instalar Dependencias
```bash
npm install
```

### Database
* Generar una base de datos en postgres nombrada igual que la variable de entorno POSTGRES_DATABASE.

* Comando para generar los schemas en la base de datos previamente creada
```bash
$ npm run migration:run
```

### Correr el servidor

```bash
# watch mode
$ npm run start:dev
```

## Frontend Ract App

### Entrar al folder app-blog
```bash
cd app-blog
```

### Crear Archivo .env con la siguiente variable
```bash
REACT_APP_API_HOST=http://localhost:3001/api/v1
```

### Instalar Dependencias
```bash
npm install
```

### Correr la aplicación (PWA)
* Dado que se desarrollo una PWA (Aplicación Web Progresiva) es recomendable correr la aplicación en modo producción para que se vea reflejado el modo Offline.

* Primero, construir la app modo producción:
```bash
npm run build
```

* Después, instalar el paquete serve:
```bash
npm install -g serve
```

* Por ultimo, correr la aplicación modo producción:
```bash
# run Modo Production
$ serve -s build
```

### Correr la aplicación (Modo desarrollo)
* Si no es necesario probar la aplicación PWA, se puede correr la aplicación en modo desarrollo y asi solo ver la funcionalidad si tener cacheado las solicitudes HTTP.

```bash
# run mode Development
$ npm run start
```