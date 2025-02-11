import { Router } from "express";
import { check } from "express-validator";
import { savePet, getPets, searchPet, updatePet, deletePet, truePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo válido').not().isEmpty(),
        validarCampos
    ],
    savePet
)

router.get("/", getPets)

router.get(
    "/:id", 
    [
        validarJWT,
        check("id", "No es ID válido").isMongoId(),
        validarCampos
    ],
    searchPet
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es ID válido").isMongoId(),
        validarCampos
    ],
    updatePet
)


router.delete(
    "/:id", 
    [
        validarJWT,
        tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
        check("id", "No es ID válido").isMongoId(),
        validarCampos
    ],
    deletePet
)

router.put(
    "/activate/:id", 
    [
        validarJWT,
        tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
        check("id", "No es ID válido").isMongoId(),
        validarCampos
    ],
    truePet
)

export default router;