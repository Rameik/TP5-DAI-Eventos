import EventRepository from '../repositories/event-repository.js';

export default class EventService {
    getAllAsync = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }
}