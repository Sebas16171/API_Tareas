# Sistema de gestión de tareas
REST API que controla un sistema de gestión de tareas registradas por usuarios

El API manejará principalmente archivos JSON donde se almacenarásn los datos de los usuarios y sus respectivas tareas. Para poder consultar y registrar datos se deberá acceder por medio de un login.
Una vez iniciada la sesión, los usuarios podrán consultar tareas, ya sea todas a la vez o por medio de una busqueda, así como también crear nuevas tareas, modificar o borrar otras ya existentes.

## Usuarios
Registrados en un archivo JSON que contendrá

- Nombre de usuario
- Clave de acceso
- Lista de tareas

### Login
El nombre de usuario y contraseña deben ser enviados por medio de un objeto JSON. El método post detectará si se ha enviado una tarea o un usuario
Usuarios y contraseñas registrados para pruebas:
- Sebas - 12345
- Sebas Dos - password

## Tareas
Registradas en JSON, cada una debajo de su respectivo usuario, contendrán:

- Id
- Titulo
- Descripcion
- Estatus de compleción
- Fecha de entrega
- Comentarios
- Responsable
