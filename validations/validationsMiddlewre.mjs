// Sprint 3 tp 2.

import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
        estado: 'error',
        mensaje: 'La validación fallo',
        errores: errors.array().map(error => ({
            campo: error.path,
            mensaje: error.msg,
            }))
      });
  }
  next();
};