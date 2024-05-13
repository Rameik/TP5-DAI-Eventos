import {Router} from 'express';
import ValidacionesHelper from '../modules/validaciones-helper.js';
import UserService from './../services/user-service.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const router = Router();
const svc = new UserService(); 

router.post("/login", async (req, res) => {
    const user = ValidacionesHelper.getStringOrDefault(req.body.username, '')
    const pass = ValidacionesHelper.getStringOrDefault(req.body.password, '')
    try{
        const response = await svc.postLoginUser(user, pass);
        if(!response) { return res.status(400).send(`El usuario no se pudo validar`) }
        const payload = {
            id: response.id,
            username: response.username
        }
        const options = {
            expiresIn: '4h',
            issuer: 'DAI_Eventos'
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        return res.status(201).json({"success": true, "message": "Usuario validado correctamente!", "token": token});
    } catch(e) {
        return res.status(500).send(`Ocurrio un error: ${e}`)
    }
});


router.post("/register", async (req, res) => {
    const firstName = ValidacionesHelper.getStringOrDefault(req.body.first_name, '')
    const lastName = ValidacionesHelper.getStringOrDefault(req.body.last_name, '')
    const user = ValidacionesHelper.getStringOrDefault(req.body.username, '')
    const pass = ValidacionesHelper.getStringOrDefault(req.body.password, '')
    try{
        const response = await svc.postRegisterUser(firstName, lastName, user, pass);
        return response != null ? res.status(200).send("Se registró el usuario con exito!") : res.status(404).send(`No se pudo registrar el usuario`);
    }
    catch(e){
        return res.status(500).send(`Ocurrio un error: ${e}`);
    }
});