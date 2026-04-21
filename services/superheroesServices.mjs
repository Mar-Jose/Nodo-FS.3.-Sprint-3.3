import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerSuperHeroePorId(id) {
    return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperHeroes() {
    return await SuperHeroRepository.obtenerTodos();
}

export async function buscarSuperHeroePorAtributo(atributo, valor) {
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperHeroesMayoresDe30() {
    return await SuperHeroRepository.obtenerMayoresDe30();
}

// sprint 3. tp1.
export async function crearSuperHeroe(valor) {
    console.log("estoy capa Services-crear");
    return await SuperHeroRepository.crearHeroe(valor);
}


export async function actualizarSuperHeroe(id, valor) {
     console.log("estoy capa Services-f-actualizar");
    return await SuperHeroRepository.actualizarHeroe(id, valor);
}


export async function eliminarSuperHeroexId(id) {
     console.log("estoy capa Services-f-eliminar x id");
    return await SuperHeroRepository.eliminarHeroexId(id);
}


export async function eliminarSuperHeroexNombre(nombre) {
     console.log("estoy capa Services-f-eleminar x nombre");
    return await SuperHeroRepository.eliminarHeroexNombre(nombre);
}