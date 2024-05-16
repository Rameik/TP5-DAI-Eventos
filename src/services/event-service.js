import EventRepository from '../repositories/event-repository.js';

export default class EventService {
    getAllAsync = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
    getEventByFilters = async (name, category, date, tag) => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventByFilters(name, category, date, tag);
        return returnArray;
    }
    getEventById = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventById(id);
        return returnArray;
    }
    getEventParticipants = async (id, firstName, lastName, user, attended, rating) => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventParticipants(id, firstName, lastName, user, attended, rating);
        return returnArray;
    }
    postInscribeEvent = async (idEvent, idUser) => {
        const repo = new EventRepository();
        let response = {};
        const event = await this.getEventById(idEvent)
        if(!event){
            response.error = 404
            response.errorMessage = `No se encontraron resultados para el id: ${idEvent}.`
            return response
        }
        const quant = await this.getQuantInscriptions(idEvent)
        if(quant.count >= event.max_assistance) {
            response.error = 400
            response.errorMessage = `Se llenaron todos los espacios para el evento: ${idEvent}`
            return response
        }
        const date = await this.getEventStartDate(idEvent)
        if(date.start_date < new Date()) {
            response.error = 400
            response.errorMessage = `No se pudo completar su inscripcion debido a que el evento (${idEvent}), ya comenzó.`
            return response
        }
        response.data = await repo.postInscribeEvent(idEvent, idUser);
        return response;
    }
    deleteInscriptionEvent = async (idEvent, idUser) => {
        const repo = new EventRepository();
        let response = {};
        if(!await this.getEventById(idEvent)){
            response.error = 404
            response.errorMessage = `No se encontraron resultados para el id: ${idEvent}.`
            return response
        }
        const count = await this.checkInscriptionToEvent(idEvent, idUser)
        if(count.count == 0){
            response.error = 404
            response.errorMessage = `El usuario (${idUser}), no está registrado al evento: ${idEvent}.`
            return response
        }
        const date = await this.getEventStartDate(idEvent)
        if(date.start_date < new Date()) {
            response.error = 400
            response.errorMessage = `No se pudo eliminar su inscripcion debido a que el evento (${idEvent}), ya comenzó.`
            return response
        }
        response.data = await repo.deleteInscriptionEvent(idEvent, idUser);
        return response;
    }
    getMyEvents = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getMyEvents(id);
        return returnArray;
    }
    postCreateEvent = async (name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, idUser, startDate) => {
        const repo = new EventRepository();
        const returnArray = await repo.postCreateEvent(name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, idUser, startDate);
        return returnArray;
    }
    putUpdateEvent = async (idEvent, name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, idUser, startDate) => {
        const repo = new EventRepository();
        let response = {};
        if(!await this.getEventById(idEvent)){
            response.error = 404
            response.errorMessage = `No se encontraron resultados para el id: ${idEvent}.`
            return response
        }
        const isOwner = await this.isEventCreator(idEvent, idUser)
        if(isOwner.count == 0) {
            response.error = 400
            response.errorMessage = `El usuario (${idUser}) no es el creador del evento (${idEvent})`
            return response
        }
        response.data = await repo.putUpdateEvent(idEvent, name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, idUser, startDate);
        return response;
    }
    deleteEvent = async (idEvent, idUser) => {
        const repo = new EventRepository();
        let response = {};
        if(!await this.getEventById(idEvent)){
            response.error = 404
            response.errorMessage = `No se encontraron resultados para el id: ${idEvent}.`
            return response
        }
        const isOwner = await this.isEventCreator(idEvent, idUser)
        if(isOwner.count == 0) {
            response.error = 400
            response.errorMessage = `El usuario (${idUser}) no es el creador del evento (${idEvent})`
            return response
        }
        response.data = await repo.deleteEvent(idEvent, idUser);
        return response;
    }
    patchRankingEvent = async (idEvent, idUser, rating, description, attended, observations) => {
        const repo = new EventRepository();
        let response = {};
        if(!await this.getEventById(idEvent)){
            response.error = 404
            response.errorMessage = `No se encontraron resultados para el id: ${idEvent}.`
            return response
        }
        const date = await this.getEventStartDate(idEvent)
        if(date.start_date < new Date()) {
            response.error = 400
            response.errorMessage = `No se pudo rankear el evento (${idEvent}) debido a que todavía no finalizó.`
            return response
        }
        const count = await this.checkInscriptionToEvent(idEvent, idUser)
        if(count.count == 0){
            response.error = 400
            response.errorMessage = `El usuario: ${idUser}, no está registrado al evento: ${idEvent}.`
            return response
        }
        response.data = await repo.patchRankingEvent(idEvent, idUser, rating, description, attended, observations);
        return response;
    }
    getAllLocations = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllLocations();
        return returnArray;
    }
    getLocationById = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getLocationById(id);
        return returnArray;
    }
    getLocationByProvinceId = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getLocationByProvinceId(id);
        return returnArray;
    }
    getAllEventLocations = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllEventLocations();
        return returnArray;
    }
    getEventLocationById = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventLocationById(id);
        return returnArray;
    }
    getEventLocationByLocationId = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventLocationByLocationId(id);
        return returnArray;
    }
    getAllEventCategories = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllEventCategories();
        return returnArray;
    }
    getEventCategoryById = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventCategoryById(id);
        return returnArray;
    }
    postEventCategory = async (name, displayOrder) => {
        const repo = new EventRepository();
        const returnArray = await repo.postEventCategory(name, displayOrder);
        return returnArray;
    }
    updateEventCategory = async (id, name, displayOrder) => {
        const repo = new EventRepository();
        const returnArray = await repo.updateEventCategory(id, name, displayOrder);
        return returnArray;
    }
    deleteEventCategory = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.deleteEventCategory(id);
        return returnArray;
    }
    getQuantInscriptions = async (idEvent) => {
        const repo = new EventRepository();
        const returnArray = await repo.getQuantInscriptions(idEvent);
        return returnArray;
    }
    checkInscriptionToEvent = async (idEvent, idUser) => {
        const repo = new EventRepository();
        const returnArray = await repo.checkInscriptionToEvent(idEvent, idUser);
        return returnArray;
    }
    getEventStartDate = async (idEvent) => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventStartDate(idEvent);
        return returnArray;
    }
    isEventCreator = async (idEvent, idUser) => {
        const repo = new EventRepository();
        const returnArray = await repo.isEventCreator(idEvent, idUser);
        return returnArray;
    }
}