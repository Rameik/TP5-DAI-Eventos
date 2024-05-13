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
        const returnArray = await repo.postInscribeEvent(idEvent, idUser);
        return returnArray;
    }
    deleteInscriptionEvent = async (idEvent, idUser) => {
        const repo = new EventRepository();
        const returnArray = await repo.deleteInscriptionEvent(idEvent, idUser);
        return returnArray;
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
        const returnArray = await repo.putUpdateEvent(idEvent, name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, idUser, startDate);
        return returnArray;
    }
}