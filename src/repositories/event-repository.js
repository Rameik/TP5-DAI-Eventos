import config from './../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool } = pkg;

export default class EventRepository {
    getAllAsync = async () => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT E.id, E.name, E.description, json_build_object('id', EC.id, 'name', EC.name) as event_category, json_build_object('id', EL.id, 'name', EL.name, 'full_address', EL.full_address, 'latitude', EL.latitude, 'longitude', EL.longitude, 'max_capacity', EL.max_capacity, 'location', json_build_object('id', L.id, 'name', L.name, 'latitude', L.latitude, 'longitude', L.longitude, 'province', json_build_object('id', P.id, 'name', P.name, 'full_name', P.full_name, 'latitude', P.latitude, 'longitude', P.longitude, 'display_order', P.display_order))) as event_location, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance, json_build_object('id', U.id, 'username', U.username, 'first_name', U.first_name, 'last_name', U.last_name) as creator_user, array(SELECT json_build_object('id', T.id, 'name', T.name) from tags T INNER JOIN event_tags ET on T.id = ET.id_tag where ET.id_event = E.id) as tags FROM events E INNER JOIN event_categories EC on E.id_event_category = EC.id INNER JOIN event_locations EL on E.id_event_location = EL.id INNER JOIN locations L on EL.id_location = L.id INNER JOIN provinces P on L.id_province = P.id INNER JOIN users U on E.id_creator_user = U.id`;
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
        let filters = [{ type: name, addString: ' LOWER(E.name) like LOWER($)'}, { type: category, addString: ' EC.name like $' }, { type: date, addString: ' E.start_date::TIMESTAMP::DATE = DATE($)' }, { type: tag, addString: ' T.name like $' }]
        filters = filters.filter((element) => element.type !== "")
        let notEmpty = filters.map((element, index) => {
            let posicion = element.addString.indexOf('$');
            element.addString = element.addString.slice(0, posicion + 1) + (index+1) + element.addString.slice(posicion + 1);
            if(element.addString.includes("E.name")) element.type = `%${element.type}%`
            if(index < 3 && index + 1 !== filters.length) element.addString = element.addString.concat(" and")
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
            const sql = `SELECT E.id, E.name, E.description, json_build_object('id', EC.id, 'name', EC.name) as event_category, json_build_object('id', EL.id, 'name', EL.name, 'full_address', EL.full_address, 'latitude', EL.latitude, 'longitude', EL.longitude, 'max_capacity', EL.max_capacity, 'location', json_build_object('id', L.id, 'name', L.name, 'latitude', L.latitude, 'longitude', L.longitude, 'province', json_build_object('id', P.id, 'name', P.name, 'full_name', P.full_name, 'latitude', P.latitude, 'longitude', P.longitude, 'display_order', P.display_order))) as event_location, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance, json_build_object('id', U.id, 'username', U.username, 'first_name', U.first_name, 'last_name', U.last_name) as creator_user, array(SELECT json_build_object('id', T.id, 'name', T.name) from tags T INNER JOIN event_tags ET on T.id = ET.id_tag where ET.id_event = E.id) as tags FROM events E INNER JOIN event_categories EC on E.id_event_category = EC.id INNER JOIN event_locations EL on E.id_event_location = EL.id INNER JOIN locations L on EL.id_location = L.id INNER JOIN provinces P on L.id_province = P.id INNER JOIN users U on E.id_creator_user = U.id where E.id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        return response;
    }

    getEventParticipants = async (id, firstName = "", lastName = "", user = "", attended = "", rating = "") => {
        let response = null;
        const client = new Client(config);
        let filters = [{ type: firstName, addString: ' LOWER(U.first_name) like LOWER($)'}, { type: lastName, addString: ' LOWER(U.last_name) like LOWER($)' }, { type: user, addString: ' LOWER(U.username) like LOWER($)' }, { type: attended, addString: ' EE.attended = $' }, { type: rating, addString: ' EE.rating > $' }]
        filters = filters.filter((element) => element.type !== "")
        let notEmpty = filters.map((element, index) => {
            let posicion = element.addString.indexOf('$');
            element.addString = element.addString.slice(0, posicion + 1) + (index+1) + element.addString.slice(posicion + 1);
            if(element.addString.includes("E.name")) element.type = `%${element.type}%`
            if(index < 3 && index + 1 !== filters.length) element.addString = element.addString.concat(" and")
            return element
        })
        try {
            await client.connect();
            let values = notEmpty.map((element) => element.type);
            values.push(id)
            let sql = `SELECT json_build_object('id', U.id, 'username', U.username, 'first_name', U.first_name, 'last_name', U.last_name) as user, EE.attended, EE.rating, EE.description from event_enrollments EE INNER JOIN users U on EE.id_user = U.id where EE.id_event = $${values.length} and`
            notEmpty.forEach(element => sql = sql.concat(element.addString))
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    postInscribeEvent = async (idEvent, idUser) => { // hacer trigger por si excede la capcidad maxima de registrados al evento
        // do $$
        // DECLARE 
        //     cantAttendance int; 
        // BEGIN
        //     INSERT INTO event_enrollments (id_event, id_user, description, registration_date_time, attended, observations)
        //     SELECT 2, 3, null, now(), false, null
        //     WHERE EXISTS (SELECT 1 FROM events e WHERE e.id = 1);
            
            
        //     SELECT COUNT(*) INTO cantAttendance
        //     FROM event_enrollments
        //     WHERE id_event = 2;
            
        //     IF cantAttendance > (select max_assistance from events where id = 2) THEN
        //         RAISE EXCEPTION 'Se superó el límite de inscripciones al evento.';
        //         ROLLBACK;
        //     END IF;
        // END $$;
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `INSERT INTO event_enrollments (id_event, id_user, description, registration_date_time, attended, observations) SELECT $1, $2, null, now(), false, null WHERE EXISTS (SELECT 1 FROM events e WHERE e.id = $1);`
            const values = [idEvent, idUser];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    deleteInscriptionEvent = async (idEvent, idUser) => { // hacer trigger por si excede la fecha de comienzo
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `DELETE from event_enrollments where id_event = $1 and id_user = $2 and EXISTS (SELECT 1 FROM events e WHERE e.id = $1);`
            const values = [idEvent, idUser];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getMyEvents = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT E.id, E.name, E.description, json_build_object('id', EC.id, 'name', EC.name) as event_category, json_build_object('id', EL.id, 'name', EL.name, 'full_address', EL.full_address, 'latitude', EL.latitude, 'longitude', EL.longitude, 'max_capacity', EL.max_capacity, 'location', json_build_object('id', L.id, 'name', L.name, 'latitude', L.latitude, 'longitude', L.longitude, 'province', json_build_object('id', P.id, 'name', P.name, 'full_name', P.full_name, 'latitude', P.latitude, 'longitude', P.longitude, 'display_order', P.display_order))) as event_location, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance, json_build_object('id', U.id, 'username', U.username, 'first_name', U.first_name, 'last_name', U.last_name) as creator_user, array(SELECT json_build_object('id', T.id, 'name', T.name) from tags T INNER JOIN event_tags ET on T.id = ET.id_tag where ET.id_event = E.id) as tags FROM events E INNER JOIN event_categories EC on E.id_event_category = EC.id INNER JOIN event_locations EL on E.id_event_location = EL.id INNER JOIN locations L on EL.id_location = L.id INNER JOIN provinces P on L.id_province = P.id INNER JOIN users U on E.id_creator_user = U.id where E.id_creator_user = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    postCreateEvent = async (name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, idUser, startDate) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `INSERT INTO events(name, description, id_event_category, id_event_location, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user, start_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
            const values = [name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, idUser, startDate];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    putUpdateEvent = async (idEvent, name, description, idEventCategory, idEventLocation, durationMinutes, price, enabledForEnrollment, maxAssistance, idUser, startDate) => {
        let response = null;
        const client = new Client(config);
        let data = [{ type: name, addString: ' name = $'}, { type: description, addString: ' description = $' }, { type: idEventCategory, addString: ' id_event_category = $' }, { type: idEventLocation, addString: ' id_event_location = $' }, { type: durationMinutes, addString: ' duration_in_minutes = $' }, { type: price, addString: ' price = $' }, { type: enabledForEnrollment, addString: ' enabled_for_enrollment = $' }, { type: maxAssistance, addString: ' max_assistance = $' }, { type: startDate, addString: ' start_date = $' }, { type: idEvent, addString: ' where id = $' }, { type: idUser, addString: ' and id_creator_user = $' }]
        data = data.filter((element) => element.type !== "")
        let notEmpty = data.map((element, index) => {
            element.addString = element.addString.concat(index + 1);
            if(index < data.length - 2 && index + 1 !== data.length - 2) element.addString = element.addString.concat(",")
            return element
        })
        try {
            await client.connect();
            let sql = `UPDATE events SET`
            notEmpty.forEach(element => sql = sql.concat(element.addString))
            const values = notEmpty.map((element) => element.type);
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    deleteEvent = async (idEvent, idUser) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `DELETE from events where id = $1 and id_creator_user = $2;`
            const values = [idEvent, idUser];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    patchRankingEvent = async (idEvent, idUser, rating) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `UPDATE event_enrollments set rating = $1 where id_event = $2 and id_user = $3`
            const values = [rating, idEvent, idUser];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getAllLocations = async () => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT L.id, L.name, L.latitude, L.longitude, json_build_object('id', P.id, 'name', P.name, 'full_name', P.full_name, 'latitude', P.latitude, 'longitude', P.longitude, 'display_order', P.display_order) as province FROM locations L INNER JOIN provinces P on L.id_province = P.id `;
            const result = await client.query(sql);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getLocationById = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT L.id, L.name, L.latitude, L.longitude, json_build_object('id', P.id, 'name', P.name, 'full_name', P.full_name, 'latitude', P.latitude, 'longitude', P.longitude, 'display_order', P.display_order) as province FROM locations L INNER JOIN provinces P on L.id_province = P.id where L.id = $1`;
            const values = [id]
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getLocationByProvinceId = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT L.id, L.name, L.latitude, L.longitude FROM locations L where L.id_province = $1`;
            const values = [id]
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getAllEventLocations = async () => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT EL.id, EL.name, EL.full_address, EL.latitude, EL.longitude, EL.max_capacity, json_build_object('id', L.id, 'name', L.name, 'latitude', L.latitude, 'longitude', L.longitude, 'province', json_build_object('id', P.id, 'name', P.name, 'full_name', P.full_name, 'latitude', P.latitude, 'longitude', P.longitude, 'display_order', P.display_order)) as location from event_locations EL INNER JOIN locations L on EL.id_location = L.id INNER JOIN provinces P on L.id_province = P.id`;
            const result = await client.query(sql);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getEventLocationById = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT EL.id, EL.name, EL.full_address, EL.latitude, EL.longitude, EL.max_capacity, json_build_object('id', L.id, 'name', L.name, 'latitude', L.latitude, 'longitude', L.longitude, 'province', json_build_object('id', P.id, 'name', P.name, 'full_name', P.full_name, 'latitude', P.latitude, 'longitude', P.longitude, 'display_order', P.display_order)) as location from event_locations EL INNER JOIN locations L on EL.id_location = L.id INNER JOIN provinces P on L.id_province = P.id where EL.id = $1`;
            const values = [id]
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getEventLocationByLocationId = async (id) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT EL.id, EL.name, EL.full_address, EL.max_capacity, EL.latitude, EL.longitude FROM event_locations EL where EL.id_location = $1`;
            const values = [id]
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getAllEventCategories = async () => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * from event_categories`;
            const result = await client.query(sql);
            await client.end();
            response = result.rows;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    getEventCategoryById = async (idCategory) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * from event_categories where id = $1`;
            const values = [idCategory]
            const result = await client.query(sql, values);
            await client.end();
            response = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    postEventCategory = async (name, displayOrder) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `INSERT INTO event_categories(name, display_order) values($1, $2)`;
            const values = [name, displayOrder]
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    updateEventCategory = async (id, name, displayOrder) => {
        let response = null;
        const client = new Client(config);
        let data = [{ type: name, addString: ' name = $'}, { type: displayOrder, addString: ' display_order = $' }, { type: id, addString: ' where id = $' }]
        data = data.filter((element) => element.type !== "")
        let notEmpty = data.map((element, index) => {
            element.addString = element.addString.concat(index + 1);
            if(index < data.length - 1 && index + 1 !== data.length - 1) element.addString = element.addString.concat(",")
            return element
        })
        try {
            await client.connect();
            let sql = `UPDATE event_categories SET`;
            notEmpty.forEach(element => sql = sql.concat(element.addString))
            const values = notEmpty.map((element) => element.type);
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
    deleteEventCategory = async (idEventCategory) => {
        let response = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `DELETE from event_categories where id = $1`
            const values = [idEventCategory];
            const result = await client.query(sql, values);
            await client.end();
            response = result.rowCount;
        } catch (error) {
            console.log(error);
        }
        return response;
    }
}
