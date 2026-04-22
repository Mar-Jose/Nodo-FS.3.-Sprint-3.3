import superHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await superHero.findById(id);
    }

    async obtenerTodos() {
        return await superHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        return await superHero.find({ [atributo]: valor });
    }
    async obtenerMayoresDe30() {
       // return await superHero.find({edad: { $gt: 30 }, planetaOrigen: "Tierra", $expr: { $gt: [ {$size: { $ifNull: [ "$poderes", [] ]}}, 1 ]} });
    const superheroefiltrado= await superHero.find({edad: { $gt: 30 }, planetaOrigen: "Tierra", $expr: { $eq: [ {$size: { $ifNull: [ "$poderes", [] ]}}, 1 ]} });
    console.log ("estoy en la capa persistencia, clase superherorepositorio, función obtener mayores de 30 que devuelve superheroefiltrado " + superheroefiltrado );
    return superheroefiltrado;
    // eq: igual. lt= menos que. gt: mayor que. gte=mayor o igual que. 
    }

    // sprint 3. tp 1.
    async crearHeroe (valor) {
    const nuevo = new superHero(valor);
     console.log("estoy capa Repo-f-crear");
    return await nuevo.save();
  }

  async actualizarHeroe (id, valor) {
     console.log("estoy capa Repo-f-actualizar");
     console.log("actualizar valor: " +valor);
    return await superHero.findByIdAndUpdate(id, valor, { new: true });
   
  }

  async eliminarHeroexId(id) {
    console.log("estoy capa Repo-f-eliminar x id");
    return await superHero.findByIdAndDelete(id);
  }

  async eliminarHeroexNombre(nombre) {
    console.log("estoy capa Repo-f-elimina x nombre");
    return await superHero.findOneAndDelete({ nombreSuperHeroe: nombre });
  }
}
export default new SuperHeroRepository;