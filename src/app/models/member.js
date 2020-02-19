const db = require('../../config/db');

module.exports = {
    all(callback){
        db.query('SELECT * FROM member', function(err, results){
            if(err) throw "Database error!";

            callback(results);
        })
    },
    create(values, callback){
        const query = `INSERT INTO member 
            (avatar_url, name, gender, email, blood, weight, height, birth, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        db.query(query, values, function(err, results){
            if(err) throw "Database error!";

            console.log(results);
        })

        callback();
    },
    find(id, callback){
        const query = `SELECT member.*, instructor.name AS instructor
        FROM member 
        JOIN instructor ON instructor.id = member.instructor_id 
        WHERE member.id = ?`;

        db.query(query, [id], function(err, results){
            if(err) throw "Database error!";

            callback(results[0]);
        })
    },
    update(id, values, callback){
        const query = `UPDATE member SET
        avatar_url = ?,
        name = ?,
        gender = ?,
        email = ?,
        blood = ?,
        weight = ?,
        height = ?,
        birth = ?,
        instructor_id = ?
        WHERE id = ${id}`;

        db.query(query, values, function(err, results){
            if(err) throw "Database error!";

            callback();
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM member WHERE id = ?`, [id], function(err, results){
            if(err) throw "Database error!";

            callback();
        });
    },
    instructorOptions(callback){
        db.query(`SELECT name, id FROM instructor`, function(err, results){
            if(err) throw "Database error!";

            callback(results);
        });
    },
    paginate(params){
        const {filter, limit, offset, callback} = params;
        let totalQuery = `SELECT count(*) FROM member`;
        let filterQuery = `WHERE member.name LIKE '%${filter}%'
        OR member.email LIKE '%${filter}%'`; 

        let query = `SELECT member.*, (${totalQuery}) AS total FROM member`;
        

        if(filter){
            // query = `${query} 
            // ${filterQuery}`;

            totalQuery = `${totalQuery} 
            ${filterQuery}`;

            query = `SELECT member.*, (${totalQuery}) AS total
            FROM member ${filterQuery}`;
        }


        query = `${query}
        ORDER BY member.name ASC 
        LIMIT ${limit} 
        OFFSET ${offset}`;
        

        console.log(query);
        db.query(query, function(err, results){
            if(err) throw 'Database error!' + err;

            callback(results);
        })
    }
}