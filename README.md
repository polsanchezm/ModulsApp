# Vue + Laravel Moduls App

## Instalación

### Backend

```bash
cd laravel-backend
composer install
cp .env.example .env    # Configurar entorno
php artisan migrate:fresh --seed # Seed añadir fake data
```

### Frontend

```bash
cd vue-frontend
npm install
```

## Ejecución

### Backend

```bash
cd laravel-backend
php artisan serve
```

### Frontend

```bash
cd vue-frontend
npm run dev
```
