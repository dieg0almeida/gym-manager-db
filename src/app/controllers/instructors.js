const { age, date } = require('../../lib/utils');
const Instructor = require('../models/instructor');

//CREATE
exports.create = function(req, res){
    res.render('instructors/create');
}

exports.post = function(req, res){

    const keys = Object.keys(req.body);

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill all fields!");
        }
    }

    let {avatar_url, name, birth, gender, services} = req.body;

    const created_at = Date.now();
    birth = Date.parse(req.body.birth);

    const values = [
        avatar_url,
        name,
        gender,
        services,
        date(birth).iso,
        date(created_at).iso
    ];

    //console.log(created_at, date(birth), date(created_at));

    Instructor.create(values, function(){
        return res.redirect('/');
    })

}
//INDEX
exports.index = function(req, res){
    Instructor.all(function(instructors){
        res.render('instructors/index', { instructors})
    })

}

//SHOW
exports.show = function(req, res){

    const { id } = req.params;

    Instructor.find(id, function(instructor){
        console.log(instructor.name);
        instructor.age = age(instructor.birth);
        instructor.services = instructor.services.split(',');
        instructor.created_at = date(instructor.created_at).format;


        return res.render('instructors/show', { instructor });
    })

}

//UPDATE
exports.edit = function(req, res){

    const { id } = req.params;

    Instructor.find(id, function(instructor){
        instructor.birth = date(instructor.birth).iso;
        return res.render('instructors/edit', { instructor });
    })
}

exports.update = function(req, res){
    const { id } = req.body;

    let {avatar_url, name, birth, gender, services} = req.body;

    const values = [
        avatar_url,
        name,
        gender,
        services,
        date(birth).iso,
    ];

    Instructor.update(id, values, function(){
        return res.redirect(`/instructors/${id}`)
    })
    
}

//DELELE
exports.delete = function(req, res){
    const { id } = req.body;

    Instructor.delete(id, function(){
        return res.redirect('/instructors');
    })
}