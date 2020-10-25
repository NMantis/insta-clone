# insta-clone

## Clone project

```
git clone https://github.com/NMantis/insta-clone.git
cd insta-clone
```

## Run API 

```
cd path/backend
composer install
```
```
cp .env.example .env
php artistan key:generate
```

open `.env` and add database credentials


```
php artisan migrate
php artisan passport:insatll
php artisan serve
```

