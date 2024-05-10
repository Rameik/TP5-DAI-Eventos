import {Router} from 'express';
import ValidacionesHelper from '../modules/validaciones-helper.js';
import EventService from './../services/event-service.js'

export const router = Router();
const svc = new EventService(); 

// router.get("", async (req, res) => {
//     const response = await svc.getAllAsync();
//     return response != null ? res.status(200).json(response) : res.status(500).send(`Error interno.`);
// });

router.get("", async (req, res) => {
    const name = ValidacionesHelper.getStringOrDefault(req.query.name, '')
    const category = ValidacionesHelper.getStringOrDefault(req.query.category, '')
    // const date = ValidacionesHelper.getDateOrDefault(req.query.startdate, '')
    const date = ""
    const tag = ValidacionesHelper.getStringOrDefault(req.query.tag, '')
    const response = await svc.getEventByFilters(name, category, date, tag);
    console.log(req.query)
    return response != null ? res.status(200).json(response) : res.status(500).send(`Error interno.`);
});

router.get("/:id", async (req, res) => {
    const id = ValidacionesHelper.getStringOrDefault(req.params.id, 0)
    try{
        if( id == 0 ) { return res.status(400).send(`Id invalido.`);}
        const response = await svc.getEventById(id);
        return response.length > 0 ? res.status(200).json(response) : res.status(400).send(`No se encontró el id: ${id}`);
    }
    catch(e){
        return res.status(400).send(e)
    }
    
});