import {Router} from 'express';
import EventService from './../services/event-service.js'

export const router = Router();
const svc = new EventService(); 

router.get("", async (req, res) => {
    const response = await svc.getAllAsync();
    console.log(req.query)
    return response != null ? res.status(200).json(response) : res.status(500).send(`Error interno.`);
});

router.get("", async (req, res) => {
    const response = await svc.getEventByName(req.query.name);
    return response != null ? res.status(200).json(response) : res.status(500).send(`Error interno.`);
});