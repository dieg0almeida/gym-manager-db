module.exports = {
    age: function(birthTimestamp){
        const today = new Date();
        const birthDate = new Date(birthTimestamp);
        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();

        if(month <= 0 && today.getDate() < birthDate.getDate()){
            age = age - 1;
        }

        return age;
    },
    date: function(birthTimestamp){
        const date = new Date(birthTimestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        };
    },
}