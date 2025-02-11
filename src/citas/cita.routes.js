import { Router } from "express";
import { check } from "express-validator";
import { saveCita } from "./cita.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("email", "Este no es un correo válido").not().isEmpty(),
        check("name", "La mascota no existe en la base de datos").not().isEmpty(),
        validarCampos
    ],
    saveCita
)

export default router;