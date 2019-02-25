const generateMessage = (from,text)=>{
    return {
        from,
        text,
        createdAt: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
    }
};

const generateLocationMessage = (from, latitute, longitute)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${latitute},${longitute}`,
        createdAt: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
    }
};

module.exports = { generateMessage, generateLocationMessage };
