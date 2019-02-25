const expect = require('expect');
const { generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
    it('should create correct message object',()=>{
        let from="Admin";
        let text="testing the generate message function";
        let result = generateMessage(from,text);
        expect(result.from).toBe(from);
        expect(result).toMatch({from,text});
        expect(result.createdAt).toBeTruthy();
    });
});

describe('generateLocationMessage', () => {
    it('should create correct Location object', () => {
        let from = "Admin";
        let url = 'https://www.google.com/maps?q=13,77'
        let result = generateLocationMessage(from, 13, 77);
        expect(result).toMatch({from, url});
        expect(result.createdAt).toBeTruthy();
    });
});