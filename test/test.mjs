import { expect } from 'chai';
import { JSDOM } from 'jsdom';
const dom = new JSDOM(
    `<html>
       <body>
          <li name="nameRule">
              Username MUST be at least 2 characters long
          </li>
       </body>
     </html>`,
    { url: 'http://localhost' },
);

global.window = dom.window;
global.document = dom.window.document;
import { nameHandler } from '../public/javascripts/validation.js';

describe('nameHandler', () => {
    it('will be red if the length is shorter than 2', () => {
        const nameRule = document.getElementsByName("nameRule")[0];
        nameRule.style.color = "red";
        nameRule.style.color = nameHandler("q");

        expect(nameRule.style.color).to.deep.equal("red");
    });

    it('will be green if the length is longer than 2', () => {
        const e = {
            target: {
                value: "qiqi"
            }
        };
        validation.nameHandler(e);
        //const nameRule = document.getElementsByName('nameRule')[0];
        const observed = nameRule.style.color;
        const expected = "green";

        expect(observed).to.deep.equal(expected);
    });

});