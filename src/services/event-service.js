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
}