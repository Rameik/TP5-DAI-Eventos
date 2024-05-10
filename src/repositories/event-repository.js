import config from './../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool } = pkg;

export default class EventRepository {
    getAllAsync = async () => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM events E INNER JOIN event_locations EL on E.id_event_location = EL.id INNER JOIN locations L on EL.id_location = L.id`;
            const result = await client.query(sql);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    getEventByFilters = async (name = "", category = "", date = "", tag = "") => {
        let response = null;
        const client = new Client(config);
        let filters = [{ type: name, addString: ' LOWER(E.name) like LOWER($'}, { type: category, addString: ' EC.name like $' }, { type: date, addString: ' E.start_date like $' }, { type: tag, addString: ' T.name like $' }]
        filters = filters.filter((element) => element.type !== "")
        let notEmpty = filters.map((element, index) => {
            element.addString = element.addString.concat(index + 1)
            if(element.addString.includes("E.name")) {
                element.type = `%${element.type}%` 
                element.addString = element.addString.concat(')')
            }
            if(index < 3 && index + 1 !== filters.length) {element.addString = element.addString.concat(" and")}
            return element
        })
        try {
            await client.connect();
            let sql = `SELECT E.id, E.name, E.description, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance FROM events E INNER JOIN event_categories EC on E.id_event_category = EC.id INNER JOIN event_tags ET on ET.id_event = E.id INNER JOIN tags T on ET.id_tag = T.id where`;
            notEmpty.forEach(element => sql = sql.concat(element.addString))
            const values = notEmpty.map((element) => element.type);
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    getEventById = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM events where id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
}
