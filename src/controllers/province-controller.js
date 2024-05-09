import {Router} from 'express';
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
    return response ? res.status(200).send(response) : res.status(404).send(`No existe una provincia con el id: ${id}`);
})

router.post("", async (req, res) => {
    try {
        const name = ValidacionesHelper.getStringOrDefault(req.body.name, '');
        const fullName = ValidacionesHelper.getStringOrDefault(req.body.full_name, 0);
        const latitude = ValidacionesHelper.getFloatOrDefault(req.body.latitude, 0);
        const longitude = ValidacionesHelper.getFloatOrDefault(req.body.longitude, 0);
        const displayOrder = ValidacionesHelper.getIntegerOrDefault(req.body.display_order, '');
        const entity = {
            name: name,
            fullName: fullName,
            latitude: latitude,
            longitude: longitude,
            displayOrder: displayOrder
        }
        const response = await svc.createAsync(entity);
        return response ? res.status(201).send('Created (201)') : res.status(400).send(`Ocurrio un error en la inserción del registro`)
    } catch (error) {
        return res.status(400).send(`Ocurrio un error: ${error}`)
    }
})

router.put('', async (req, res) => {
    const id = ValidacionesHelper.getIntegerOrDefault(req.body.id, 0)
    const provinciasArray = await svc.getAllAsync();
    const index = provinciasArray.findIndex(element => element.id === id)
    if(index != -1){
        try {
            let name = ValidacionesHelper.getStringOrDefault(req.body.name, '').length > 0 ? ValidacionesHelper.getStringOrDefault(req.body.name, '') : provinciasArray[index].name;
            let fullName = ValidacionesHelper.getStringOrDefault(req.body.full_name, '').length > 0 ? ValidacionesHelper.getStringOrDefault(req.body.full_name, '') : provinciasArray[index].fullName
            let latitude = ValidacionesHelper.getFloatOrDefault(req.body.latitude, '').length > 0 ? ValidacionesHelper.getFloatOrDefault(req.body.latitude, '') : provinciasArray[index].latitude
            let longitude = ValidacionesHelper.getFloatOrDefault(req.body.longitude, '').length > 0 ? ValidacionesHelper.getFloatOrDefault(req.body.longitude, '') : provinciasArray[index].longitude
            let displayOrder = ValidacionesHelper.getIntegerOrDefault(req.body.display_order, '').length > 0 ? ValidacionesHelper.getIntegerOrDefault(req.body.display_order, '') : provinciasArray[index].displayOrder
            const entity = {
                id: id,
                name: name,
                fullName: fullName,
                latitude: latitude,
                longitude: longitude,
                displayOrder: displayOrder
            }
            const response = await svc.updateAsync(entity);
            return response ? res.status(201).send('Created (201)') : res.status(400).send(`Ocurrio un error en la modificación del registro`)
        } catch (error) {
            return res.status(400).send(`Ocurrio un error: ${error}`)
        }
    }
    else{ return res.status(404).send(`No existe una provincia con el id: ${id}`) }
})

router.delete('/:id', async (req, res) => {
    const id = ValidacionesHelper.getIntegerOrDefault(req.params.id, 0)
    const provinciasArray = await svc.getAllAsync();
    const index = provinciasArray.findIndex((element) => element.id === id);

    if(index === -1){
        return res.status(404).send(`No existe una provincia con el id: ${id}`);
    }
    else{
        const response = await svc.deleteByIdAsync(id);
        return response ? res.status(200).send('Provincia encontrada y eliminada! (200)') : res.status(400).send(`Ocurrio un error en la eliminación del registro`)
    }
})