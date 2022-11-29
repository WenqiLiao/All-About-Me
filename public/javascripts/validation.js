  import {nameHandler, pwdHandler, emailHandler} from './regi_handle.mjs'
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