import {Router} from 'express';
import ValidacionesHelper from '../modules/validaciones-helper.js';
import EventService from './../services/event-service.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const router = Router();
const svc = new EventService(); 

router.get("", async (req, res) => {
    const response = await svc.getAllAsync();
    return response != null ? res.status(200).json(response) : res.status(500).send(`Error interno.`);
});

router.get("", async (req, res) => {
    const name = ValidacionesHelper.getStringOrDefault(req.query.name, '')
    const category = ValidacionesHelper.getStringOrDefault(req.query.category, '')
    const date = ValidacionesHelper.getDateOrDefault(req.query.startdate, '')
    const tag = ValidacionesHelper.getStringOrDefault(req.query.tag, '')
    try {
        const response = await svc.getEventByFilters(name, category, date, tag);
        return response != null ? res.status(200).json(response) : res.status(404).send(`No se encontró ningun resultado para tu busqueda.`);
    }
    catch(e) {
        return res.status(500).send("Error interno.", e)
    }
});

router.get("/:id", async (req, res) => {
    const id = ValidacionesHelper.getIntegerOrDefault(req.params.id, 0)
    try{
        if( id == 0 ) { return res.status(400).send(`Id invalido.`);}
        const response = await svc.getEventById(id);
        return response.length > 0 ? res.status(200).json(response) : res.status(404).send(`No se encontró el id: ${id}`);
    }
    catch(e){
        return res.status(400).send({success: false, error: e})
    }
});

router.get("/:id/enrollment", async (req, res) => {
    const id = ValidacionesHelper.getIntegerOrDefault(req.params.id, 0)
    try{
        if(id == 0) { return res.status(400).send(`Id invalido.`)}
        const firstName = ValidacionesHelper.getStringOrDefault(req.query.first_name, '')
        const lastName = ValidacionesHelper.getStringOrDefault(req.query.last_name, '')
        const user = ValidacionesHelper.getStringOrDefault(req.query.username, '')
        const attended = ValidacionesHelper.getBooleanOrDefault(req.query.attended, '') 
        const rating = ValidacionesHelper.getIntegerOrDefault(req.query.rating, '') 

        const response = await svc.getEventParticipants(id, firstName, lastName, user, attended, rating);
        return response.length > 0 ? res.status(200).json(response) : res.status(404).send(`No se encontraron resultados.`);
    }
    catch(e){
        return res.status(400).send({success: false, error: e})
    }
});

router.post("/:id/enrollment", async (req, res) => {
    const idEvent = ValidacionesHelper.getIntegerOrDefault(req.params.id, 0)
    try{
        if(idEvent == 0) { return res.status(404).send(`Id invalido.`)}
        const access_token = req.headers.authorization.split(' ')[1];
        let payloadOriginal = await jwt.verify(access_token, process.env.SECRET_KEY)
        const response = await svc.postInscribeEvent(idEvent, payloadOriginal.id)
        return response > 0 ? res.status(201).send({success: true, message: "Registro exitoso!"}) : res.status(404).send({success: false, message:`No se encontraron resultados para el id: ${idEvent}.`});
    }
    catch(e){
        return res.status(400).send({success: false, error: e})
    }
});

router.delete("/:id/enrollment", async (req, res) => {
    const idEvent = ValidacionesHelper.getIntegerOrDefault(req.params.id, 0)
    try{
        if(idEvent == 0) { return res.status(404).send(`Id invalido.`)}
        const access_token = req.headers.authorization.split(' ')[1];
        let payloadOriginal = await jwt.verify(access_token, process.env.SECRET_KEY)
        const response = await svc.deleteInscriptionEvent(idEvent, payloadOriginal.id)
        return response > 0 ? res.status(201).send({success: true, message: "Inscripción eliminada exitosamente!"}) : res.status(404).send({success: false, message: `No se encontraron resultados para el id: ${idEvent}.`});
    }
    catch(e){
        return res.status(400).send({success: false, error: e})
    }
});


router.get("/myEvents", async (req, res) => {
    try{
        const access_token = req.headers.authorization.split(' ')[1];
        let payloadOriginal = await jwt.verify(access_token, process.env.SECRET_KEY)
        const response = await svc.getMyEvents(payloadOriginal.id)
        return response.length > 0 ? res.status(201).send({success: true, results: response}) : res.status(404).send({success: false, message:`No se encontraron eventos creados por el id: ${payloadOriginal.id}.`});
    }
    catch(e){
        return res.status(400).send({success: false, error: e})
    }
});

router.post("/createEvent", async (req, res) => { // no tira el error
    const name = ValidacionesHelper.getStringOrDefault(req.body.name, '')
    const description = ValidacionesHelper.getStringOrDefault(req.body.description, '')
    const idEventCategory = ValidacionesHelper.getIntegerOrDefault(req.body.id_event_category, '')
    const idEventLocation = ValidacionesHelper.getIntegerOrDefault(req.body.id_event_location, '')
    const durationMinutes = ValidacionesHelper.getIntegerOrDefault(req.body.duration_in_minutes, '')
    const price = ValidacionesHelper.getIntegerOrDefault(req.body.price, '')
    const enabledForEnrollment = ValidacionesHelper.getBooleanOrDefault(req.body.enabled_for_enrollment, '')
    const startDate = ValidacionesHelper.getDateOrDefault(req.body.start_date, '')
    const maxAssistance = ValidacionesHelper.getIntegerOrDefault(req.body.max_assistance, '')
    try{
        const access_token = req.headers.authorization.split(' ')[1];
        let payloadOriginal = await jwt.verify(access_token, process.env.SECRET_KEY)
        if([name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, startDate].some(element => element == null || element === "")) throw new Error("Un valor ingresado estaba vacío!")
        const response = await svc.postCreateEvent(name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, payloadOriginal.id, startDate)
        return response > 0 ? res.status(201).send({success: true, results: "Evento creado con exito!"}) : res.status(404).send({success: false, message:`No se pudo crear el evento.`});
    }
    catch(e){
        return res.status(400).send({success: false, error: e})
    }
});

router.put("/updateEvent", async (req, res) => {
    const idEvent = ValidacionesHelper.getIntegerOrDefault(req.body.id, 0)
    const name = ValidacionesHelper.getStringOrDefault(req.body.name, '')
    const description = ValidacionesHelper.getStringOrDefault(req.body.description, '')
    const idEventCategory = ValidacionesHelper.getIntegerOrDefault(req.body.id_event_category, '')
    const idEventLocation = ValidacionesHelper.getIntegerOrDefault(req.body.id_event_location, '')
    const durationMinutes = ValidacionesHelper.getIntegerOrDefault(req.body.duration_in_minutes, '')
    const price = ValidacionesHelper.getIntegerOrDefault(req.body.price, '')
    const enabledForEnrollment = ValidacionesHelper.getBooleanOrDefault(req.body.enabled_for_enrollment, '')
    const startDate = ValidacionesHelper.getDateOrDefault(req.body.start_date, '')
    const maxAssistance = ValidacionesHelper.getIntegerOrDefault(req.body.max_assistance, '')
    try{
        if(idEvent == 0) { return res.status(404).send(`Id invalido.`)}
        const access_token = req.headers.authorization.split(' ')[1];
        let payloadOriginal = await jwt.verify(access_token, process.env.SECRET_KEY)
        const response = await svc.putUpdateEvent(idEvent, name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, payloadOriginal.id, startDate)
        return response > 0 ? res.status(201).send({success: true, results: "Evento creado con exito!"}) : res.status(404).send({success: false, message:`No se pudo modificar el evento.`});
    }
    catch(e){
        return res.status(400).send({success: false, error: e})
    }
});

//Eliminar eventos propios

//Hacer rating de un evento

//Locations

//Categorias