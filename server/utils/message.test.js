const expect = require('expect');
const { generateMessage} = require('./message');

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