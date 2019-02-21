const generateMessage = (from,text)=>{
    return {
        from,
        text,
        createdAt: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
    }
};

module.exports={ generateMessage };
