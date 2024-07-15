import {Router} from 'express';
import ValidacionesHelper from '../modules/validaciones-helper.js';
import ProvinceService from './../services/province-service.js'

export const router = Router();
const svc = new ProvinceService();

router.get("", async (req, res) => {
    const response = await svc.getAllAsync();
    return response != null ? res.status(200).json(response) : res.status(500).send(`Error interno.`);
});

router.get("/:id", async (req, res) => {
    const id = ValidacionesHelper.getIntegerOrDefault(req.params.id, 0)
    const response = await svc.getByIdAsync(id);
    return response ? res.status(200).send(response) : res.status(404).send({success: false, message: `No existe una provincia con el id: ${id}`});
})

router.get("/:id/locations", async (req, res) => {
    const id = ValidacionesHelper.getIntegerOrDefault(req.params.id, 0)
    try {
        const response = await svc.getLocationsByIdAsync(id);
        console.log(response)
        return response.length > 0 ? res.status(200).send(response) : res.status(404).send({success: false, message: `No existe una provincia con el id: ${id}`});
    } catch (error) {
        return res.status(400).send({success: false, error: error})
    }
})

router.post("", async (req, res) => {
    try {
        const name = ValidacionesHelper.getStringOrDefault(req.body.name, '');
        const fullName = ValidacionesHelper.getStringOrDefault(req.body.full_name, 0);
        const latitude = ValidacionesHelper.getFloatOrDefault(req.body.latitude, 0);
        const longitude = ValidacionesHelper.getFloatOrDefault(req.body.longitude, 0);
        const displayOrder = ValidacionesHelper.getIntegerOrDefault(req.body.display_order, '');
        if([name, fullName, latitude, longitude, displayOrder].some(element => element == "" || element == 0)) throw ("Un valor ingresado estaba vacío!")
        const entity = {
            name: name,
            fullName: fullName,
            latitude: latitude,
            longitude: longitude,
            displayOrder: displayOrder
        }
        const response = await svc.createAsync(entity);
        return response ? res.status(201).send({success: true, results: "Provincia creada con exito!"}) : res.status(400).send({success: false, message: `Ocurrio un error en la inserción del registro`})
    } catch (e) {
        return res.status(400).send({success: false, error: e})
    }
})

router.put('', async (req, res) => {
    const id = ValidacionesHelper.getIntegerOrDefault(req.body.id, 0)
    try {
        if(id == 0) throw (`Id invalido.`)
        const provincia = await svc.getByIdAsync(id);
        if (!provincia) return res.status(404).send({success: false, message: `No existe una provincia con el id: ${id}`})
        let name = ValidacionesHelper.getStringOrDefault(req.body.name, '').length > 0 ? ValidacionesHelper.getStringOrDefault(req.body.name, '') : provincia.name;
        let fullName = ValidacionesHelper.getStringOrDefault(req.body.full_name, '').length > 0 ? ValidacionesHelper.getStringOrDefault(req.body.full_name, '') : provincia.full_name
        let latitude = ValidacionesHelper.getFloatOrDefault(req.body.latitude, '') !== "" ? ValidacionesHelper.getFloatOrDefault(req.body.latitude, '') : provincia.latitude
        let longitude = ValidacionesHelper.getFloatOrDefault(req.body.longitude, '') !== "" ? ValidacionesHelper.getFloatOrDefault(req.body.longitude, '') : provincia.longitude
        let displayOrder = ValidacionesHelper.getIntegerOrDefault(req.body.display_order, '') > 0 ? ValidacionesHelper.getIntegerOrDefault(req.body.display_order, '') : provincia.display_order
        const entity = {
            id: id,
            name: name,
            fullName: fullName,
            latitude: latitude,
            longitude: longitude,
            displayOrder: displayOrder
        }
        const response = await svc.updateAsync(entity);
        return response > 0 ? res.status(201).send({success: true, results: "Provincia modificada con exito!"}) : res.status(400).send({success: false, message: `Ocurrio un error en la modificación del registro`})
    } catch (e) {
        return res.status(400).send({success: false, error: e})
    }
})

router.delete('/:id', async (req, res) => {
    const id = ValidacionesHelper.getIntegerOrDefault(req.params.id, 0)
    try {
        if(id == 0) throw (`Id invalido.`)
        const provincia = await svc.getByIdAsync(id);
        if (!provincia) return res.status(404).send({success: false, message: `No existe una provincia con el id: ${id}`})
        const response = await svc.deleteByIdAsync(id);
        return response > 0 ? res.status(200).send({success: true, results: "Provincia eliminada con exito!"}) : res.status(400).send({success: false, message: `Ocurrio un error en la eliminación del registro`})
    } catch (e) {
        return res.status(400).send({success: false, error: e})
    }
    
})