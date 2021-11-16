# Citizen claims

Aplicacion que permite cargar, editar, eliminar y leer reclamos de una comuna de la ciudad de Buenos Aires.

## Levantar el proyecto

Primero hay que completar los datos sensibles en la carpeta config como el nombre de la DB y la conexion con la misma y luego renombrar el archivo sacando el .example.

Y luego por terminal en la carpeta raiz correr estos comandos

```bash
yarn install

yarn tsc

yarn start
```

## Endpoints

- [GET] /claims: lista todos los reclamos

- [POST] /claims: crea un nuevo reclamo. Espera title, description, municipality y un archivo con nombre image

- [PUT] /claims/:id: edita un reclamo por id. Los campos son los mismo que en la creacion, y para el archivo se puede enviar el nombre del que ya tenia o un archivo nuevo

- [DELETE] /claims/:id: elimina el archivo por id

