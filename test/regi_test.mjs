import { expect } from 'chai';
import { JSDOM } from 'jsdom';
const dom = new JSDOM(
    `<html>
       <body>
          <li name="nameRule">
              Username MUST be at least 2 characters long
          </li>
          <li name="emailRule">
              Email MUST be a valid email
          </li>
          <li name="pwdRule1">
              Password MUST be at least 8 characters long
          </li>
          <input type="submit" value="register" name="submit">
       </body>
     </html>`,
    { url: 'http://localhost' },
);

global.window = dom.window;
global.document = dom.window.document;
import {nameHandler, pwdHandler, emailHandler} from '../public/javascripts/regi_handle.mjs';

describe('nameHandler', () => {
    it('will be red if the length is shorter than 2', () => {
        const e = {
            target: {
                value: "q"
            }
        };
        nameHandler(e);
        const nameRule = document.getElementsByName("nameRule")[0];
        expect(nameRule.style.color).to.deep.equal("red");
    });

    it('will be green if the length is longer than 2', () => {
        const e = {
            target: {
                value: "qiqi"
            }
        };
        nameHandler(e);
        const nameRule = document.getElementsByName('nameRule')[0];

        expect(nameRule.style.color).to.deep.equal("green");
    });

});

describe('passwordHandler', () => {
    it('will be red if the length is shorter than 8', () => {
        const e = {
            target: {
                value: "shorter"
            }
        };
        pwdHandler(e);
        const pwdRule1 = document.getElementsByName("pwdRule1")[0];
        expect(pwdRule1.style.color).to.deep.equal("red");
    });

    it('will be green if the length is longer than 8', () => {
        const e = {
            target: {
                value: "longerThanEight"
            }
        };
        pwdHandler(e);
        const pwdRule1 = document.getElementsByName("pwdRule1")[0];
        expect(pwdRule1.style.color).to.deep.equal("green");
    });

});

describe('emailHandler', () => {
    it('will be red if the input is not a vaid email address', () => {
        const e = {
            target: {
                value: "notValid"
            }
        };
        emailHandler(e);
        const emailRule = document.getElementsByName("emailRule")[0];
        expect(emailRule.style.color).to.deep.equal("red");
    });

    it('will be green if the input is not a vaid email address', () => {
        const e = {
            target: {
                value: "valid@nyu.edu"
            }
        };
        emailHandler(e);
        const emailRule = document.getElementsByName("emailRule")[0];
        expect(emailRule.style.color).to.deep.equal("green");
    });

});