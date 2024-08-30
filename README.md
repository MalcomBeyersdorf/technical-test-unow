# Prueba tecnica Unow

Prueba Fullstack Angular, NodeJs y Mongo.

## Metodos de ejecucion del projecto

### Rapida

Correr el comando en la raiz del repo

> docker-compose up

Crea servicios front, back y base de datos.

- <http://localhost:4200/> Acceso al front
- <http://localhost:3000/healthz> Acceso al back (prueba de vida)
- Uri mongo -> mongodb://mongodb:27017/mydatabase

### Ejemplos cURLS para backend

- SignIn (ingreso)

```
curl -X POST <http://localhost:3000/security/sign-in> \
-H "Content-Type: application/json" \
-d '{
"username": "user1",
"password": "password1"
}'
```

- SignUp (registro)

```
curl -X POST http://localhost:3000/security/sign-up \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "job": "Engineer",
  "birthDate": "1990-01-01",
  "username": "johndoe",
  "password": "password123"
}'
```
