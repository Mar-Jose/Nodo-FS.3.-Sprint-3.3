class IRepository {
    
    obtenerPorId(id)
    {
        throw new Error ("Metodo 'obtenerPorId()' no implementado");
    }
    obtenerTodos()
    {
        throw new Error ("Metodo 'obtenerTodos()' no implementado");
    }
    buscarPorAtributo(atributo,valor)
    {
        throw new Error ("Metodo 'buscarPorAtributo()' no implementado");
    }
     obtenerMayoresDe30()
    {
        throw new Error ("Metodo 'obtenerMayoresDe30()' no implementado");
    }
    // sprint 3.tp 1.
      crearHeroe(valor)
    {
        throw new Error ("Metodo 'crear()' no implementado");
    }
    actualizarHeroe(id, valor)
    {
        throw new Error ("Metodo 'actualizarHeroe()' no implementado");
    }
    eliminarHeroexId(id)
    {
        throw new Error ("Metodo 'eliminarHeroePorId()' no implementado");
    }
    eliminarHeroexNombre(nombre)
    {
        throw new Error ("Metodo 'eliminarHeroePorNombre()' no implementado");
    }
}

export default IRepository;