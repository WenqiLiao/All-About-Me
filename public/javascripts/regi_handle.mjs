function nameHandler(e) {
    const nameRule = document.getElementsByName("nameRule")[0];
    const uname = e.target.value;
    nameRule.style.color = "red";
    if (uname.length >= 2) {
      nameRule.style.color = "green";
    } 
  }

  function pwdHandler(e) {
      const pwdRule1 = document.getElementsByName("pwdRule1")[0];
      const pwd = e.target.value;
      pwdRule1.style.color = "red";
      if (pwd.length >= 8) {
        pwdRule1.style.color = "green";
      }
  }

  function emailHandler(e) {
      const emailRule = document.getElementsByName("emailRule")[0];
      const eml = e.target.value;
      emailRule.style.color = "red";
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (eml.match(emailRegex)) {
          emailRule.style.color = "green";
      }
  }

export {
    nameHandler,
    pwdHandler,
    emailHandler
  }
