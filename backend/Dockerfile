# Use an official PHP runtime as a parent image
FROM php:8.2-fpm


# Install dependencies
RUN apt-get update && apt-get install -y \
    libmcrypt-dev \
    libonig-dev \
    zlib1g-dev \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo mbstring zip

RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the current directory contents into the container at /app
COPY . /app

# Set the working directory to /app
WORKDIR /app

# Install application dependencies
RUN composer install --no-scripts --no-autoloader

# Generate autoload files
RUN composer dump-autoload --optimize

COPY . .

# Expose port 8000 to the outside world
EXPOSE 8000

# CMD to start Laravel development server
CMD php artisan serve --host 0.0.0.0