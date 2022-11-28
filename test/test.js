const expect = require('chai').expect;
const validation = require('./public/javascripts/validation.js');

describe('nameHandler', () => {
    it('will be red if the length is shorter than 2', () => {
        const nameRule = {
            style: {
                color: '',
            }
        };
        const e = {
            target: {
                value: "q",
            }
        };
        validation.nameHandler(e);
        const observed = nameRule.style.color;
        const expected = "red";
  
        expect(observed).to.deep.equal(expected);
      });
  
    it('will be green if the length is longer than 2', () => {
        const nameRule = {
            style: {
                color: '',
            }
        };
        const e = {
            target: {
                value: "qiqi",
            }
        };
        validation.nameHandler(e);
        const observed = nameRule.style.color;
        const expected = "green";
  
        expect(observed).to.deep.equal(expected);
      });
});