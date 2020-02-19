const { age, date } = require('../../lib/utils');
const Member = require('../models/member');

//CREATE
exports.create = function(req, res){
    Member.instructorOptions(function(instructors){
        res.render('members/create', {instructors});
    })
}

exports.post = function(req, res){

    const keys = Object.keys(req.body);

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Please, fill all fields!");
        }
    }

    let {avatar_url, name, birth, gender, email, blood, weight, height} = req.body;

    const created_at = Date.now();
    birth = Date.parse(req.body.birth);

    const values = [
        avatar_url,
        name,
        gender,
        email,
        blood,
        weight,
        height,
        date(birth).iso,
        date(created_at).iso
    ];

    //console.log(created_at, date(birth), date(created_at));

    Member.create(values, function(){
        return res.redirect('/members');
    })

}
//INDEX
exports.index = function(req, res){
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * ( page - 1 );

    const params = {
        filter,
        limit,
        offset,
        callback(members){
            const pagination = {
                total: Math.ceil( members[0].total / limit ),
                page
            };

            res.render('members/index', {filter, members, pagination});
        }
    };

    Member.paginate(params);

}

//SHOW
exports.show = function(req, res){

    const { id } = req.params;

    Member.find(id, function(member){
        console.log(member.name);
        member.age = age(member.birth);
        member.created_at = date(member.created_at).format
        return res.render('members/show', { member });
    })

}

//UPDATE
exports.edit = function(req, res){

    const { id } = req.params;

    Member.find(id, function(member){
        member.birth = date(member.birth).iso;

        Member.instructorOptions(function(instructors){
            return res.render('members/edit', { member, instructors });
        });
    })
}

exports.update = function(req, res){
    const { id } = req.body;

    let {avatar_url, name, birth, gender, email, blood, weight, height, instructor} = req.body;


    const values = [
        avatar_url,
        name,
        gender,
        email,
        blood,
        weight,
        height,
        date(birth).iso,
        instructor
    ];

    Member.update(id, values, function(){
        return res.redirect(`/members/${id}`)
    })
    
}

//DELELE
exports.delete = function(req, res){
    const { id } = req.body;

    Member.delete(id, function(){
        return res.redirect('/members');
    })
}