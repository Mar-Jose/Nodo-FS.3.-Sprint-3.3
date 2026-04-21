// Sprint 3. tp 2.

import { body, param } from 'express-validator';

//  Sprint 3. tp 2. Requerimiento 1.

export const superheroeValidations = [
  body('nombreSuperHeroe')
    .notEmpty()
    .withMessage('El nombre de superhéroe es requerido')
    .escape()
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage('El nombre de superhéroe debe tener entre 3 y 60 caracteres'),
   
    //  Sprint 3. tp 2. Requerimiento 2.

  body('nombreReal')
    .notEmpty()
    .escape()
    .withMessage('El nombre real del superheroe es requerido')
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage('El nombre real del superheroe debe tener entre 3 y 60 caracteres'),

    //  Sprint 3. tp 2. Requerimiento 3:
    
  body('edad')
    .notEmpty()
    .escape()
    .isNumeric()
    .withMessage('La edad del superheroe es requerida')
    .trim()
    .isInt({ min: 0 })
    .withMessage('La edad del superheroe debe ser un número entero positivo'),

    //  Sprint 3. tp 2. Requerimiento 4:
    
   
  body('poderes')
        .notEmpty().withMessage("Campo 'poderes' obligatorio.")
      .custom(value => {
        if (!value || typeof value !== 'string') throw new Error("Poderes inválidos.");
        const poderesArray = value.split(',').map(p => p.trim()).filter(p => p.length >= 3 && p.length <= 60);
        if (poderesArray.length === 0) throw new Error("El campo poderes debe contener al menos un poder válido (entre 3 y 60 caracteres).");
        return true;
      }),

      //falta debilidad, aliados, enemigos ver trello??? sprint 3 tp 2 Requeriminto...
  /*
    .isArray({ min: 1 }).withMessage('Debe proporcionar al menos un poder del superheroe')
    
    .custom((poderes) => {
      return poderes.every(poder => 
        typeof poder === 'string' && 
        poder.trim() && 
        poder.trim().length >= 3 && 
        poder.trim().length <= 60
      );
    }).withMessage('Cada poder del superheroe debe ser un string de 3 a 60 caracteres sin espacios en blanco')
*/
    ];