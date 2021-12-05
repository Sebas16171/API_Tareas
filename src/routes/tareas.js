const { request, Router } = require("express");
const router = Router();
const _ = require('underscore');
const md5 = require("blueimp-md5");

//  TODO: Importar el usuario desde el login
var active_user = 0;

const usuarios = require('../test-data.json');
var tareas = require('../test-data.json')[active_user].Tasks;

router.get('/', (req, res) => {
    /* GET Todos los datos
        No recibe ningun parametro
        Envia al cliente los datos de todas las tareas registradas
     */
    res.json(tareas)
});

router.get('/:id', (req, res) => {
    /* GET Un solo dato
        Parametros:
            - ID: El identificador de la tarea que se va a buscar

        Envia al cliente los datos de la tarea con el ID que se solicito
        Si no existe una tarea con dicho ID, envia un error al cliente
     */
    const { id } = req.params;
    _.each(tareas, (tarea, i) => {
        if (tarea.ID == id) {
            res.send(tareas[i]);
            return;
        }
    });
    res.json(`Error: La tarea con el ID ${id} no existe`);
});

router.post('/', (req, res) => {
    /* POST Registrar nueva tarea
        Parametros:
            - Objeto JSON: Los datos de la nueva tarea que se va a agregar. Debe contenter:
                + Titulo*       + Descripcion*
                + Estatus*      + Fecha*
                + Comentarios   + Responsable
            Toma los datos enviados por el cliente para registrar una nueva tarea
            Si los datos estan incompletos envia un error al cliente

            O en su lugar...
            - Objeto JSON: Los datos de autenticacion del usuario. Debe contener:
                + user*         + pass
            Toma los datos enviados por el cliente y busca al usuario entre los registrados
            Si el usuario es encontrado, compara la clave registrada con la enviada por el cliente
            En caso de que las claves coincidan, autentica al usuario e importa su lista de tareas 

    */

    const { Titulo, Descripcion, Estatus, Fecha, Comentarios, Responsable } = req.body;
    const { user, pass } = req.body;
    if (user && pass){
        _.each(usuarios, (usuario, i) => {
            if (usuario.Username == user) {
                if (usuario.Password == md5(pass)) {
                    res.send(`Autenticado con el ID ${i}`);
                    active_user = i;
                    tareas = require('../test-data.json')[active_user].Tasks;
                    return;
                } else {
                    res.send("Clave incorrecta");
                    return;
                }
            }
        });
        res.send("Usuario no encontrado");
    } else if (Titulo && Descripcion && Estatus && Fecha) {
        const id = tareas.length + 1;
        const nueva_tarea = {id, ...req.body};
        tareas.push(nueva_tarea);
        res.json(tareas);
    } else {
        res.json("Error");
    }
});

router.put('/:id', (req, res) => {
    /* PUT Modifica datos registrados
        Parametros:
            - ID: El identificador de la tarea que se va a modificar
            - Objeto JSON: Los datos de la nueva tarea que se va a modificar. Debe contenter:
                + Titulo        + Descripcion
                + Estatus       + Fecha
                + Comentarios   + Responsable
        
        Busca la tarea que se quiere modificar por medio del ID proporcionado por el cliente
        Recibe y da formato a los datos que envia el cliente para modificar la tarea
        Identifica que campos ingreso el cliente y los cambia en la tarea correspondiente
        En caso de no encontrar la tarea, envia un error al cliente


    */
    const { id } = req.params;
    const { Titulo, Descripcion, Estatus, Fecha, Comentarios, Responsable } = req.body;


    _.each(tareas, (tarea, i) => {
        if (tarea.ID == id) {
            if (Titulo) {
                tarea.Titulo = Titulo
            }
            if (Descripcion) {
                tarea.Descripcion = Descripcion
            }
            if (Estatus) {
                tarea.Estatus = Estatus
            }
            if (Fecha) {
                tarea.Fecha = Fecha
            }
            if (Comentarios) {
                tarea.Comentarios = Comentarios
            }
            if (Responsable) {
                tarea.Responsable = Responsable
            }
            return;
        }
    });
    res.json(`Error: La tarea con el ID ${id} no existe`);
});

router.delete('/:id', (req, res) => {
    /* DELETE Elimina una tarea
        Parametros:
            - ID: El identificador de la tarea que se busca eliminar
        Busca la tarea con el ID enviado por el cliente y lo elimina
        En caso de que la tarea con dicho ID no exista, envia un error al cliente
     */
    const { id } = req.params;
    _.each(tareas, (tarea, i) => {
        if (tarea.ID == id) {
            tareas.splice(i, 1);
            res.send(tareas);
            return;
        }
    });
    res.json(`Error: La tarea con el ID ${id} no existe`);
});

module.exports = router;