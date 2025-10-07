# Build a self-contained Laravel runner (single container) using the PHP CLI server
FROM php:8.3-cli

# system deps
RUN apt-get update && apt-get install -y git unzip libzip-dev libonig-dev libicu-dev default-mysql-client \
    && docker-php-ext-install pdo_mysql intl zip

# composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Create a fresh Laravel project during build
RUN composer create-project laravel/laravel:^11.0 . --no-interaction

# Copy our overlay (controllers, models, routes, tests, etc.)
COPY overlay/ /app/

# Prepare app key and config cache later at runtime
RUN chown -R www-data:www-data /app

# Entrypoint runs migrations, then starts the PHP dev server
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8000
CMD ["/start.sh"]
