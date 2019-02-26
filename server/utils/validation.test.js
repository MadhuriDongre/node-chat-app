const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString',()=>{
    it('should allow string with non-space characters',()=>{
        let result = isRealString("    Madhuri    ");
        expect(result).toBe(true);
    });
    it('should reject strings with only spaces', () => {
        let result = isRealString("     ");
        expect(result).toBe(false);
    });
    it('should reject non string values', () => {
        let result = isRealString(97);
        expect(result).toBe(false);
    });
});