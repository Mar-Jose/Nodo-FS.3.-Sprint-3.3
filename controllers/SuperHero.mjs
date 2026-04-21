import { validationResult } from 'express-validator';  //importación de función que permite encontrar errores y mostrar en la vista/redirect
import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, buscarSuperHeroePorAtributo, obtenerSuperHeroesMayoresDe30, crearSuperHeroe, actualizarSuperHeroe, eliminarSuperHeroexId, eliminarSuperHeroexNombre } from '../services/superheroesServices.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';                             
                                                            

export async function obtenerSuperHeroePorIdController(req, res) {
    try {
      console.log("estoy en la capa controllers, f:obtener todos x Id");
        const { id } = req.params;
        const superheroe = await obtenerSuperHeroePorId(id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        return res.status(200).json(superheroeFormateado);
    } catch (error) {
        return res.status(500).send ({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}
// sprint 3. tp 3. Etapa 4. Requerimiento 4.
export async function editarSuperheroeController(req, res) {
    try {
      console.log("estoy en la capa controllers, f:editar");
        const { id } = req.params; 
        const heroe = await obtenerSuperHeroePorId(id);

        if (!heroe) {
            return res.status(404).send({ mensaje: 'Error al obtener el superhéroe.' });}
          //  res.render('editSuperhero', { heroe: heroe }); 
        // sprint 3. tp 3. Etapa &. Requerimiento 3.
            return res.render('editSuperhero', { heroe });
        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener datos del superhéroe para su edición.', error: error.message });
    }
}


export async function obtenerTodosLosSuperHeroesController(req, res) {
    try {
      console.log("estoy en la capa controllers, f:obtener todos");
        const superheroes = await obtenerTodosLosSuperHeroes();
        //sprint 3. tp 3. Etapa 2. Requerimiento 3.
        res.render('dashboard',{ heroes: superheroes }); 
        /*pertenece a  sprint anteriores (las 2 lineas siguientes) ahora reeplazado por la linea anterior a esta.
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        return res.status(200).json(superheroesFormateados);
        */
    } catch (error) {
        return res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

//sprint 3. tp 3. Etapa 3. Requerimiento 2 continua en routes.
export async function rutaParaFormularioVistaAddController(req, res) {
    try {     
        res.render('addSuperhero');        
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al crear el Super Héroe', error: error.message });
    }    
} 

export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
      console.log("estoy en la capa controllers, f:atributo");
        const { atributo, valor } = req.params;
        const superheroes = await  buscarSuperHeroePorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }                          
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
            return res.status(200).json(superheroesFormateados);
    } catch (error) {
            return res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperHeroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperHeroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
            return res.status(500).send({mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message});
    }
}

// sprint 3. tp 1. 

export async function crearSuperHeroeController(req, res) {
  try {
    console.log("estoy en la capa controllers, f:crear");
    const nuevoSuperheroe = req.body;
    const superheroeCreado = await crearSuperHeroe(nuevoSuperheroe);
    
    const superheroeFormateado = renderizarSuperheroe(superheroeCreado);
    res.status(201).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({mensaje: "Error al crear el superhéroe", error: error.message,});
  }
}

//sprint 3. tp 3. Etapa 3. Requerimiento 3.
export async function AgregarSuperHeroeController(req, res) {
  try {
     console.log("estoy en la función controlador, agregar para crear.");
    const nuevoSuperheroe = req.body;
    const superheroeCreado = await crearSuperHeroe(nuevoSuperheroe);
     res.redirect('/heroes');
      } catch (error) {
        res.status(500).render('addSuperheroe', {error:'Error al crear el superhéroe.'});
      }
    };
  
 /*
Sprint 3. tp 3. Etapa & Requerimiento 2. (activar= descomentar)
export async function AgregarSuperHeroeController(req, res) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).render('addSuperhero', { 
            errores: errors.array(), 
            datosPrevios: req.body 
        });
    }

    try {
        const datosSuperheroe = req.body;
        const nuevoSuperheroe = await crearSuperHeroe(datosSuperheroe); 
        
        if (!nuevoSuperheroe) {
            return res.status(500).send({ mensaje: "No se pudo crear el superhéroe" });
        }
        
        return res.redirect('/heroes'); 

    } catch (error) {
        console.error("Error al agregar superhéroe:", error);
        return res.status(500).send({ mensaje: 'Error al procesar la solicitud', error: error.message });
    }
}
 */
 // sprint 3. tp 1. 

export async function actualizarSuperHeroeController(req, res) {
  try {
    console.log("estoy en la capa controllers, f:actualizar");
    const { id } = req.params;
    const datosActualizados = req.body;
    
    const superheroeActualizado = await actualizarSuperHeroe(id, datosActualizados);
    console.log(superheroeActualizado);
    if (!superheroeActualizado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error: error.message,});
    }
}
 // Sprint 3. tp 3. Etapa &. Requerimiento 3 formulario edit...
 export async function actualizarSuperheroeVistaController(req, res) {
  console.log("estoy en la capa controllers, f:actualizar-vista");
    const { id } = req.params;
    const datosSuperheroe = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const heroe = await obtenerSuperHeroePorId(id);
      return res.status(400).render('editSuperhero', {
                heroe,
                errores: errors.array(),
            });
        }

    try {
        const superheroeActualizado = await actualizarSuperHeroe(id, datosSuperheroe);
        
        if (!superheroeActualizado) {
            return res.status(404).render('error', { mensaje: "Superhéroe no encontrado para actualizar." });
        }
        
        return res.redirect('/api/heroes'); 

    } catch (error) {
        console.error("Error al actualizar superhéroe:", error);
        return res.status(500).send({ mensaje: 'Error al procesar la solicitud de edición', error: error.message });
    }
}

export async function eliminarSuperHeroexIdController(req, res) {
  try {
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperHeroexId(id);
    
    if (!superheroeEliminado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({mensaje: "Error al eliminar el superhéroe", error: error.message,});
  }
}
// Sprint 3. tp 3. Etapa 5 Requerimiento 4
export async function eliminarSuperheroeController(req, res) {
  try {
     console.log("estoy en la función controlador, f: delete.");
    const { id } = req.params;
    const superheroeEliminado = await eliminarSuperHeroexId(id);
    
    if (!superheroeEliminado) {
      
      return res.redirect('/heroes');
    }
    
    //const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    //res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({mensaje: "Error al eliminar el superhéroe", error: error.message,});
  }
}

export async function eliminarSuperHeroexNombreController(req, res) {
  try {
    const { nombre } = req.params;
    const superheroeEliminado = await eliminarSuperHeroexNombre(nombre);
    
    if (!superheroeEliminado) {
      return res.status(404).send({ mensaje: "Superheroe no encontrado" });
    }
    
    const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
    res.status(200).json(superheroeFormateado);
  } catch (error) {
    res.status(500).send({mensaje: "Error al eliminar el superhéroe", error: error.message,});
  }
}