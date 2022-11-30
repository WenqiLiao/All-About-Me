import { nameHandler, pwdHandler, emailHandler } from './regi_handle.mjs';
main();

document.addEventListener('DOMContentLoaded', main);

function main() {
  // DOM Elements
  const name = document.getElementsByName("name")[0];

  const email = document.getElementsByName("email")[0];

  const password = document.getElementsByName("password")[0];

  // Event Listners
  name.addEventListener("input", nameHandler);
  email.addEventListener("input", emailHandler);
  password.addEventListener("input", pwdHandler);

}



/*
function main() {
  // DOM Elements
  const submitBtn = document.getElementsByName('submit')[0];
  submitBtn.disabled = true;
  const name = document.getElementsByName("name")[0];
  const email = document.getElementsByName("email")[0];
  const password = document.getElementsByName("password")[0];
  // Event Listners
  function checkAll() {
    name.addEventListener("input", nameHandler);
    email.addEventListener("input", emailHandler);
    password.addEventListener("input", pwdHandler);
  }
  async function allowSubmit() {
    await checkAll();
    console.log("ok", document.getElementsByName("nameRule")[0].style.color);
    if (document.getElementsByName("nameRule")[0].style.color == 'green'
  && document.getElementsByName("emailRule")[0].style.color == 'green'
  && document.getElementsByName("pwdRule1")[0].style.color == 'green') {
    console.log("you better get here");
    submitBtn.disabled = false;
  }
    
  }
  allowSubmit();

}
*/