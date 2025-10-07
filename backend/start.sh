#!/usr/bin/env bash
set -e

cd /app

# If .env doesn't exist, copy and set base vars
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Ensure env uses container DB settings (overrides via docker-compose env)
php -r '
$env = file_get_contents(".env");
$map = [
  "APP_ENV" => getenv("APP_ENV") ?: "local",
  "APP_DEBUG" => getenv("APP_DEBUG") ?: "true",
  "APP_URL" => getenv("APP_URL") ?: "http://localhost:8080",
  "DB_CONNECTION" => getenv("DB_CONNECTION") ?: "mysql",
  "DB_HOST" => getenv("DB_HOST") ?: "db",
  "DB_PORT" => getenv("DB_PORT") ?: "3306",
  "DB_DATABASE" => getenv("DB_DATABASE") ?: "todo",
  "DB_USERNAME" => getenv("DB_USERNAME") ?: "todo",
  "DB_PASSWORD" => getenv("DB_PASSWORD") ?: "todo",
];
foreach ($map as $k=>$v) {
  $env = preg_replace("/^$k=.*/m", "$k=$v", $env);
}
file_put_contents(".env", $env);
';

# Generate app key if missing
php artisan key:generate --force

# Wait for DB (compose already healthchecks, this is a safe extra)
for i in {1..30}; do
  php -r 'new PDO("mysql:host=" . getenv("DB_HOST") . ";port=" . getenv("DB_PORT"), getenv("DB_USERNAME"), getenv("DB_PASSWORD"));' && break || echo "Waiting DB..."
  sleep 2
done

php artisan migrate --force
php artisan config:clear

# Run server
php artisan serve --host=0.0.0.0 --port=8000
