import EventRepository from '../repositories/event-repository.js';

export default class EventService {
    getAllAsync = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
    getEventByName = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventByName();
        return returnArray;
    }
    getEventByCategory = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getEventByCategory();
        return returnArray;
    }
}