# Projecte Vue

## Instalació

### Backend

```bash
cd laravel-backend
composer install
cp .env.example .env    # Configurar entorn
php artisan migrate:fresh --seed # Seed per afegir dades fake
```

### Frontend

```bash
cd vue-frontend
npm install
```

## Execució

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
