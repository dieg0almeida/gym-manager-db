const db = require('../../config/db');

module.exports = {
    all(callback){
        db.query('SELECT * FROM instructor', function(err, results){
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
    }
}