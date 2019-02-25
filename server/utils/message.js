const moment = require('moment');
let date = moment();

const generateMessage = (from,text)=>{
    return {
        from,
        text,
        createdAt: date.valueOf()
    }
};

const generateLocationMessage = (from, latitute, longitute)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${latitute},${longitute}`,
        createdAt: date.valueOf()
    }
};

module.exports = { generateMessage, generateLocationMessage };
