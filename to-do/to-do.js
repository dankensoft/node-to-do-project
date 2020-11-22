const fs = require('fs');

let toDoList = [];

const saveDB = () => {
    let data = JSON.stringify(toDoList);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const uploadDB = () => {
    try {
        toDoList = require('../db/data.json');
    } catch (error) {
        toDoList = [];
    }
}

const getList = () => {
    uploadDB();
    return toDoList;
}

const update = (descripcion, completado) => {
    uploadDB();
    let index = toDoList.findIndex(task => {
        return task.descripcion === descripcion;
    });
    if (index >= 0) {
        toDoList[index].completado = completado;
        saveDB();
        return true;
    } else {
        return false;
    }
}

const deleted = (descripcion) => {
    uploadDB();
    let newList = toDoList.filter(task => {
        return task.descripcion !== descripcion;
    });
    if (toDoList.length === newList.length) {
        return false;
    } else {
        toDoList = newList;
        saveDB();
        return true;
    }
}

const crear = (descripcion) => {

    uploadDB();

    let toDo = {
        descripcion,
        completado: false
    };

    toDoList.push(toDo);

    saveDB();

    return toDo;
}

module.exports = {
    crear,
    getList,
    update,
    deleted
}