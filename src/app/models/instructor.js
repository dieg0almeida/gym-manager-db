const db = require('../../config/db');

module.exports = {
    all(callback){
        const query = `SELECT instructor.*, member.instructor_id, count(member.instructor_id) as total_students 
        FROM instructor JOIN member ON (instructor.id = member.instructor_id)
        GROUP BY instructor.id 
        ORDER BY total_students DESC`;
        db.query(query, function(err, results){
            if(err) throw "Database error!";
            callback(results);
        })
    },
    allWithFilter(filter, callback){
        const query = `SELECT instructor.*, member.instructor_id, count(member.instructor_id) as total_students 
        FROM instructor JOIN member ON (instructor.id = member.instructor_id)
        WHERE instructor.name LIKE '%${filter}%'
        OR instructor.services LIKE '%${filter}%'
        GROUP BY instructor.id 
        ORDER BY total_students DESC`;
        db.query(query, function(err, results){
            if(err) throw "Database error!";
            callback(results);
        })
    },
    create(values, callback){
        const query = `INSERT INTO INSTRUCTOR 
            (avatar_url, name, gender, services, birth, created_at) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        
        db.query(query, values, function(err, results){
            if(err) throw "Database error!";

            console.log(results);
        })

        callback();
    },
    find(id, callback){
        const query = `SELECT * FROM instructor WHERE id = ?`;

        db.query(query, [id], function(err, results){
            if(err) throw "Database error!";

            callback(results[0]);
        })
    },
    update(id, values, callback){
        const query = `UPDATE instructor SET
        avatar_url = ?,
        name = ?,
        gender = ?,
        services = ?,
        birth = ?
        WHERE id = ${id}`;

        db.query(query, values, function(err, results){
            if(err) throw "Database error!";

            callback();
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM instructor WHERE id = ?`, [id], function(err, results){
            if(err) throw "Database error!";

            callback();
        });
    },
    paginate(params){
        const {filter, limit, offset, callback} = params;
        let totalQuery = `SELECT count(*) FROM instructor`;
        let filterQuery = `WHERE instructor.name LIKE '%${filter}%'
        OR instructor.services LIKE '%${filter}%'`; 

        let query = `SELECT instructor.*, (${totalQuery}) AS total, member.instructor_id, count(member.instructor_id) as total_students 
        FROM instructor JOIN member ON (instructor.id = member.instructor_id)`;
        

        if(filter){
            // query = `${query} 
            // ${filterQuery}`;

            totalQuery = `${totalQuery} 
            ${filterQuery}`;

            query = `SELECT instructor.*, (${totalQuery}) AS total, member.instructor_id, count(member.instructor_id) as total_students 
            FROM instructor JOIN member ON (instructor.id = member.instructor_id) ${filterQuery}`;
        }


        query = `${query}
        GROUP BY instructor.id 
        ORDER BY total_students DESC 
        LIMIT ${limit} 
        OFFSET ${offset}`;
        

        console.log(query);
        db.query(query, function(err, results){
            if(err) throw 'Database error!' + err;

            callback(results);
        })
    }
}