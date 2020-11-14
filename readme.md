# Referencia

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

### Bicicletas Web

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
 	
### Bicicletas API

#### POST (<i>C</i>reate)

##### Ingresar una nueva bicicleta al sistema:

* `POST http://host:3000/api/bicicletas/create`

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

Respuesta del metodo POST, es un JSON status 200, con la información de la bicicleta ingresada al sistema

#### GET (<i>R</i>ead)

##### Consultar todas las bicicletas del sistema:

* `GET http://host:3000/api/bicicletas`

La respuesta es un Array de JSON con todas las bicicletas en el sistema.

```JSON
{
"bicicletas": [
		{
			"id": 1,
			"color": "rojo",
			"modelo": "ubarna",
			"ubicacion": [
				-41.134889,
				-71.306174
			]
		},
		{
			"id": 2,
			"color": "blanca",
			"modelo": "ubarna",
			"ubicacion": [
				-41.134889,
				-71.305974
			]
		}
	]
}
```

#### DELETE (<i>D</i>elete)

##### Borrar una bicicleta:

* `DELETE http://host:3000/api/bicicletas/delete`

Se envia el parametro "ID" dentro de un JSON.
```JSON
{
	"id": 1
}
```
La respuesta es un _STATUS_ (204).