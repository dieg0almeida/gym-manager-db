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
        const query = `SELECT * FROM member WHERE id = ?`;

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
        birth = ?
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
    }
}