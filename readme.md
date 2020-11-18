# Referencia - Red Bicicletas API
### Contenido
1. Instalación
2. Bicicletas Web
3. Bicicletas API  
4. Testing



## Instalación 
Para dar cumplimiento con el enunciado del ejercicio, se indica a continuación  los comandos de ejecución:

```
	npm install
```

Instala todas las dependencias de nodejs en el proyecto.

```
	npm devstart
```

Ejecuta la dependencia nodemon en modo dev.
El script *"devstart"* se encuentra configurado en el archivo package.json del proyecto
```
	npm test
```
Ejecuta todos los test del sistema, segun lo solicitado en el módulo 2.

## Bicicletas Web

 1. Mensaje de bienvenida Express
	* `http://host:3000/express/`
 2. Pagina principal de bicicletas
 	* `http://host:3000/`
 3. Lista bicicletas
 	* `http://host:3000/bicicletas/`
 4. Crear nueva bicicleta 
 	* `http://host:3000/bicicletas/create`
5. Actualizar bicicleta
 	* `http://host:3000/bicicletas/${id}/update`
6. Eliminar bicicleta del sistema
 	* `http://host:3000/bicicletas/${id}/delete`	
 	
## Bicicletas API

#### [Bicicletas](#Bicicletas) 
<<<<<<< HEAD
### `/api/bicicletas`
=======
 `/api/bicicletas`
>>>>>>> testing
* [ ] `GET /`
* [ ]  `POST /bicicletas/create`
* [ ] `PATCH /bicicletas/update`
* [ ] `DELETE /bicicletas/delete`
#### [Usuarios](#Usuarios) 
#### `/api/usuarios`
 * [ ]  `GET /`
 * [ ]  `POST /usuarios/create`
 * [ ]  `POST /usuarios/reservar`
 * [ ]  `DELETE /usuarios/delete`
 
#### [Reservas](#Reservas) 
#### `/api/usuarios/reservas`
* [ ]  `GET /`
* [ ] `PATCH /reservas/update`
* [ ]  `DELETE /reservas/delete`
<<<<<<< HEAD

#### POST (Create)

### Bicicletas 
##### GET (Read)

##### Consultar todas las bicicletas del sistema:

* `GET http://localhost:3000/api/bicicletas`

La respuesta es un Array de _JSON_STATUS_OK__(_200)_ con todas las bicicletas en el sistema.

```JSON
{
	"bicicletas": [
		{
			"ubicacion": [
				34,
				35
			],
			"_id": "5fb43b5170dfd6564ced3bb2",
			"code": 1,
			"color": "Rojo",
			"modelo": "Urbano",
			"__v": 0
		},
		{
			"ubicacion": [
				34,
				35
			],
			"_id": "5fb43ba4bb5f9b684cab4711",
			"code": 2,
			"color": "Azul",
			"modelo": "Monataña",
			"__v": 0
		}
	]
}
```
##### POST (Create) 

=======

### Bicicletas 
##### GET (Read)

##### Consultar todas las bicicletas del sistema:

* `GET http://localhost:3000/api/bicicletas`

La respuesta es un Array de _JSON_STATUS_OK__(_200)_ con todas las bicicletas en el sistema.

```JSON
{
	"bicicletas": [
		{
			"ubicacion": [
				34,
				35
			],
			"_id": "5fb43b5170dfd6564ced3bb2",
			"code": 1,
			"color": "Rojo",
			"modelo": "Urbano",
			"__v": 0
		},
		{
			"ubicacion": [
				34,
				35
			],
			"_id": "5fb43ba4bb5f9b684cab4711",
			"code": 2,
			"color": "Azul",
			"modelo": "Monataña",
			"__v": 0
		}
	]
}
```
##### POST (Create) 
>>>>>>> testing

##### Ingresar una nueva bicicleta al sistema:

* `POST http://localhost:3000/api/bicicletas/create`

Todos los campos son obligatorios

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| code| Int | Número de identificación |
| color | String | Color de la bicicleta|
| modelo | String | Modelo de bicicleta |
| lat | Double | Latitud donde se encuentra la bicicleta |
| lng | Double | Longitud donde se encuentra la bicicleta |

JSON de ejemplo:
  
```JSON
{
	"code":5,
	"color":"Rojo",
	"modelo":"Urbana",
	"lat":-41.133968,
	"lng": -71.314426
}
```

Respuesta del metodo POST, es un _JSON_STATUS_OK__(_200)_, con la información de la bicicleta ingresada al sistema

<<<<<<< HEAD
#### GET (Read)

##### PATCH (Update) 
##### Actualizar  bicicleta del sistema:
* `PATCH http://localhost:3000/api/bicicletas/update`


Los campos son obligatorios son code, color, modelo, los campos lat, y lng son opcionales.

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| code | Int | Número de identificación |
| color | String | Color de la bicicleta|
| modelo | String | Modelo de bicicleta |
| lat | Double | Latitud donde se encuentra la bicicleta |
| lng | Double | Longitud donde se encuentra la bicicleta |

JSON de ejemplo:
  
```JSON
{
	"code":5,
	"color":"rojo",
	"modelo":"urbana",
	"lat":-41.133968,
	"lng": -71.314426
}
```
Respuesta del metodo PATCH, es un _JSON_STATUS_OK_ 200, con la información de la bicicleta actualizada
##### DELETE (Delete)
##### Borrar una bicicleta:

* `DELETE http://localhost:3000/api/bicicletas/delete`

Se envia el parametro "CODE" de la bicicleta a eliminar dentro de un JSON.
```JSON
{
	"code": 1
}
```
La respuesta es un _JSON_STATUS_OK_ (204) (No content)
### Usuarios
##### GET (Read)
##### Consultar todos las usuarios del sistema:
* `GET http://localhost:3000/api/usuarios`

=======
##### PATCH (Update) 
##### Actualizar  bicicleta del sistema:
* `PATCH http://localhost:3000/api/bicicletas/update`

Los campos son obligatorios son code, color, modelo, los campos lat, y lng son opcionales.

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| code | Int | Número de identificación |
| color | String | Color de la bicicleta|
| modelo | String | Modelo de bicicleta |
| lat | Double | Latitud donde se encuentra la bicicleta |
| lng | Double | Longitud donde se encuentra la bicicleta |

JSON de ejemplo:
  
```JSON
{
	"code":5,
	"color":"rojo",
	"modelo":"urbana",
	"lat":-41.133968,
	"lng": -71.314426
}
```
Respuesta del metodo PATCH, es un _JSON_STATUS_OK_ 200, con la información de la bicicleta actualizada
##### DELETE (Delete)
##### Borrar una bicicleta:

* `DELETE http://localhost:3000/api/bicicletas/delete`

Se envia el parametro "CODE" de la bicicleta a eliminar dentro de un JSON.
```JSON
{
	"code": 1
}
```
La respuesta es un _JSON_STATUS_OK_ (204) (No content)
### Usuarios
##### GET (Read)
##### Consultar todos las usuarios del sistema:
* `GET http://localhost:3000/api/usuarios`

>>>>>>> testing
La respuesta es un Array de _JSON_STATUS_OK__(_200)_ con usuarios en el sistema.
```JSON
{
	"usuarios": [
		{
			"_id": "5fb439744c1d71bbacb7fef3",
			"nombre": "Federico",
			"__v": 0
		},
		{
			"_id": "5fb4397a4c1d71bbacb7fef4",
			"nombre": "Gabriel",
			"__v": 0
		}
	]
}
```
##### POST (Create) 
##### Ingresar un nuevo usuario al sistema:

<<<<<<< HEAD
#### DELETE (Delete)

* `POST http://localhost:3000/api/usuarios/create`

=======
* `POST http://localhost:3000/api/usuarios/create`

>>>>>>> testing
Consta de un único campo y es obligatorio.

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| nombre | String | Nombre del usuario |
JSON de ejemplo:
  
```JSON
{
	"nombre":"Nombre de ejemplo"
}
```
Respuesta del metodo POST, es un _JSON_STATUS_OK__(_200)_, con la información de la bicicleta ingresada al sistema
##### POST (Create) - Reserva 
##### Ingresar una nueva reserva al sistema:
<<<<<<< HEAD

* `POST http://localhost:3000/api/usuarios/reservar`

Todos los campos son obigatorios.

=======

* `POST http://localhost:3000/api/usuarios/reservar`

Todos los campos son obigatorios.

>>>>>>> testing
| Campo | Tipo | Descripción |
|:---|:---:| --- |
| id | String| Número de id del usuario que realiza la reserva |
| bici_id | String | Número de id de bicicleta de la reserva|
| desde | Date | Fecha de inicio de la reserva AAAA-MM-DD |
| hasta | Date | Fecha final de la reserva AAAA-MM-DD |
JSON de ejemplo:  
```JSON
{
	"id": "5fb439744c1d71bbacb7fef3", 
	"bici_id": "5fb43b5170dfd6564ced3bb2",
	"desde":"2020-11-20",
	"hasta": "2020-11-19"
<<<<<<< HEAD
}
```
Respuesta del metodo POST, es un _JSON_STATUS_OK__(_200)_, con la información de la reserva ingresada al sistema

##### DELETE (Delete)
##### Borrar un usuario del sistema:

* `DELETE http://localhost:3000/api/usuarios/delete`

Se envia el parametro "nombre" del usuario a eliminar del sistema, dentro de un JSON.
```JSON
{
	"nombre": "Federico"
}
```
La respuesta es un _JSON_STATUS_OK_ (204) (No content)
### Reservas
##### GET (Read)
##### Consultar todas las reservas del sistema:

* `GET http://localhost:3000/api/reservas/`

La respuesta es un Array de _JSON_STATUS_OK__(_200)_ con todas las reservas en el sistema.

```JSON
{
	"reservas": [
		{
			"_id": "5fb43c4bbb5f9b684cab4712",
			"usuario": "5fb439744c1d71bbacb7fef3",
			"bicicleta": "5fb43b5170dfd6564ced3bb2",
			"desde": "2020-10-10T00:00:00.000Z",
			"hasta": "2020-10-20T00:00:00.000Z",
			"__v": 0
		}
	]
}
```
=======
}
```
Respuesta del metodo POST, es un _JSON_STATUS_OK__(_200)_, con la información de la reserva ingresada al sistema

##### DELETE (Delete)
##### Borrar un usuario del sistema:

* `DELETE http://localhost:3000/api/usuarios/delete`

Se envia el parametro "nombre" del usuario a eliminar del sistema, dentro de un JSON.
```JSON
{
	"nombre": "Federico"
}
```
La respuesta es un _JSON_STATUS_OK_ (204) (No content)
### Reservas
##### GET (Read)
##### Consultar todas las reservas del sistema:

* `GET http://localhost:3000/api/reservas/`

La respuesta es un Array de _JSON_STATUS_OK__(_200)_ con todas las reservas en el sistema.

```JSON
{
	"reservas": [
		{
			"_id": "5fb43c4bbb5f9b684cab4712",
			"usuario": "5fb439744c1d71bbacb7fef3",
			"bicicleta": "5fb43b5170dfd6564ced3bb2",
			"desde": "2020-10-10T00:00:00.000Z",
			"hasta": "2020-10-20T00:00:00.000Z",
			"__v": 0
		}
	]
}
```
>>>>>>> testing
##### PATCH (Update) 
##### Actualizar  una reserva del sistema:
* `PATCH http://localhost:3000/api/usuarios/reservas/update`

Todos los campos son obigatorios.

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| usuario| String| Número de id del usuario que realiza la reserva |
| bicicleta| String | Número de id de bicicleta de la reserva|
| desde | Date | Fecha de inicio de la reserva AAAA-MM-DD |
| hasta | Date | Fecha final de la reserva AAAA-MM-DD |

JSON de ejemplo:
  
```JSON
{
	"usuario":"5fb439744c1d71bba7fef3",
	"bicicleta": "5fb43b5170dfd6564ced3bb2",
	"desde": "2020-01-01",
<<<<<<< HEAD
	"hasta": "2020-01-20"
=======
	"hasta", "2020-01-20
>>>>>>> testing
}
```
Respuesta del metodo PATCH, es un _JSON_STATUS_OK_ 200, con la información de la reserva actualizada
##### DELETE (Delete)
##### Borrar una una reserva:

* `DELETE http://localhost:3000/api/usuarios/reservas/delete`

Se envia el parametro "usuario" y "bicicleta" de la reserva a eliminar dentro de un JSON.
```JSON
{
	"usuario":"5fb439744c1d71bba7fef3",
	"bicicleta": "5fb43b5170dfd6564ced3bb2"
}
```
La respuesta es un _JSON_STATUS_OK_ (204) (No content)


<<<<<<< HEAD
## Testing
El testing de la aplicación se realiza con la dependencia _Jasmine_, la misma se instala al ejecutar el comando indicado en el módulo de **Instalación**. Se cuenta con dos opciones para correr los tests realizados sobre los _ENDPOINT_.
Ejecutar todos los tests automaticamente.

```
	npm test
```

=======
##### POST (Create) 
##### Ingresar una nueva reserva al sistema:

* `POST http://localhost:3000/api/usuarios/reservas/create`

Todos los campos son obligatorios

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| id | Int | Número de identificación |
| color | String | Color de la bicicleta|
| modelo | String | Modelo de bicicleta |
| lat | Double | Latitud donde se encuentra la bicicleta |
| lng | Double | Longitud donde se encuentra la bicicleta |

JSON de ejemplo:
  
```JSON
{
"id":5,
"color":"rojo",
"modelo":"urbana",
"lat":-41.133968,
"lng": -71.314426
}
```

Respuesta del metodo POST, es un _JSON_STATUS_OK__(_200)_, con la información de la bicicleta ingresada al sistema

##### PATCH (Update) 

##### Actualizar  bicicleta del sistema:

* `PATCH http://host:3000/api/bicicletas/update`

Todos los campos son obligatorios

| Campo | Tipo | Descripción |
|:---|:---:| --- |
| id | Int | Número de identificación |
| color | String | Color de la bicicleta|
| modelo | String | Modelo de bicicleta |
| lat | Double | Latitud donde se encuentra la bicicleta |
| lng | Double | Longitud donde se encuentra la bicicleta |

JSON de ejemplo:
  
```JSON
{
"id":5,
"color":"rojo",
"modelo":"urbana",
"lat":-41.133968,
"lng": -71.314426
}
```
Respuesta del metodo PATCH, es un _JSON_STATUS_OK_ 200, con la información de la bicicleta actualizada

## Testing
El testing de la aplicación se realiza con la dependencia _Jasmine_, la misma se instala al ejecutar el comando indicado en el módulo de **Instalación**. Se cuenta con dos opciones para correr los tests realizados sobre los _ENDPOINT_.
Ejecutar todos los tests automaticamente.
```
	npm test
```
>>>>>>> testing
Ejecutar test indivudualmente, los mismos se encutran dentro de la carpeta _/spec_, cada uno con su correspondiente nombre.
A continuación se lista los tests disponibles dentro del proyecto.
```
	jasmine spec/models/bicicleta_test.spec.js
	jasmine spec/models/usuario_test.spec.js
	jasmine usuario_api_test_create.spec.js
	jasmine usuario_api_test_delete.spec.js
	jasmine usuario_api_test_reservar.spec.js
	jasmine bicicleta_api_test_delete.spec.js
	jasmine bicicleta_api_test_update.spec.js
	jasmine bicicleta_api_test_create.spec.js
	jasmine bicicleta_api_test_get.spec.js
	jasmine reservas_api_test_delete.spec.js
	jasmine reservas_api_test_get.spec.js
	jasmine reservas_api_test_update.spec.js
```

