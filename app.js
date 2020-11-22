// const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;

const toDo = require('./to-do/to-do');

const colors = require('colors');

console.log(argv);

let comando = argv._[0];

switch (comando) {
    case 'crear':
        console.log('Crear por hacer');
        let task = toDo.crear(argv.descripcion);
        console.log(task);
        break;

    case 'listar':
        console.log('Mostrar todas las tareas por hacer');
        let list = toDo.getList();
        for (let task of list) {
            console.log('========To Do========'.green);
            console.log(task.descripcion);
            console.log('Estado: ', task.completado);
            console.log('====================='.green);
        }
        break;

    case 'actualizar':
        console.log('Actualiza una tarea por hacer');
        let actualizado = toDo.update(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case 'borrar':
        let borrado = toDo.deleted(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no es reconocido');
        break;
}