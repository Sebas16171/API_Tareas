# Sistema de gestión de tareas
REST API que controla un sistema de gestión de tareas registradas por usuarios

El API manejará principalmente archivos JSON donde se almacenarásn los datos de los usuarios y sus respectivas tareas. Para poder consultar y registrar datos se deberá acceder por medio de un login.
Una vez iniciada la sesión, los usuarios podrán consultar tareas, ya sea todas a la vez o por medio de una busqueda, así como también crear nuevas tareas, modificar o borrar otras ya existentes.

## Usuarios
Registrados en un archivo JSON que contendrá

- Nombre de usuario
- Clave de acceso
- Lista de tareas

## Tareas
Registradas en JSON, cada una debajo de su respectivo usuario, contendrán:

- Id
- Titulo
- Descripcion
- Estatus de compleción
- Fecha de entrega
- Comentarios
- Responsable
