document.addEventListener("DOMContentLoaded", function () {

    // DOM Elements
    const name = document.getElementsByName("name")[0];
    const nameRule = document.getElementsByName("nameRule")[0];

    const email = document.getElementsByName("email")[0];
    const emailRule = document.getElementsByName("emailRule")[0];

    const password = document.getElementsByName("password")[0];
    const pwdRule1 = document.getElementsByName("pwdRule1")[0];

    // Event Listners
    name.addEventListener("input", nameHandler);
    email.addEventListener("input", emailHandler);
    password.addEventListener("input", pwdHandler);


    function nameHandler(e) {
      const uname = e.target.value;
      nameRule.style.color = "red";
      if (uname.length >= 2) {
        nameRule.style.color = "green";
      } 
    }
    
    function pwdHandler(e) {
      const pwd = e.target.value;
      pwdRule1.style.color = "red";
      if (pwd.length >= 8) {
        pwdRule1.style.color = "green";
      }
    }

    function emailHandler(e) {
        const eml = e.target.value;
        emailRule.style.color = "red";
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (eml.match(emailRegex)) {
            emailRule.style.color = "green";
        }
    }
});




















/*
document.addEventListener('DOMContentLoaded', main);
const main = async () => {
    const emailInput = document.getElementsByName('email')[0];
    emailInput.addEventListener("input", function() {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailInput.value.match(emailRegex)) {
            alert('Invalid email address.');
        }
    });

    const password = document.getElementsByName('password')[0];
    password.addEventListener("input", function() {
        const confirmPassword = document.getElementsByName('confirm-password')[0];
        if (password.value !== confirmPassword.value) {
        alert('Entered passwords do not match');
        }
        if (password.length < 6) {
        alert('Password must be more than 6 characters long');
        }
    });
}

main();
*/
