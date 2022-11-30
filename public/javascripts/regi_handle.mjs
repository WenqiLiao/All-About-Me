function nameHandler(e) {
  //console.log("am i the first");
    const nameRule = document.getElementsByName("nameRule")[0];
    const uname = e.target.value;
    nameRule.style.color = "red";
    const submitBtn = document.getElementsByName('submit')[0];
    submitBtn.disabled = true;
    if (uname.length >= 2) {
      nameRule.style.color = "green";
      submitBtn.disabled = false;
    }
  }

  function pwdHandler(e) {
      const pwdRule1 = document.getElementsByName("pwdRule1")[0];
      const pwd = e.target.value;
      pwdRule1.style.color = "red";
      const submitBtn = document.getElementsByName('submit')[0];
      submitBtn.disabled = true;
      if (pwd.length >= 8) {
        pwdRule1.style.color = "green";
        submitBtn.disabled = false;

      }
  }

  function emailHandler(e) {
      const emailRule = document.getElementsByName("emailRule")[0];
      const eml = e.target.value;
      emailRule.style.color = "red";
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const submitBtn = document.getElementsByName('submit')[0];
      submitBtn.disabled = true;
      if (eml.match(emailRegex)) {
          emailRule.style.color = "green";
          submitBtn.disabled = false;
      }
  }

export {
    nameHandler,
    pwdHandler,
    emailHandler
  }
