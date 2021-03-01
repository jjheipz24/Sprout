"use strict";

//import { useState } from 'react'
//Handles signup requests
var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    //TODO: Implement error feedback
    console.log("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    //TODO: Implement error feedback
    console.log("Passwords do not match");
    return false;
  }

  sendAjax($("#signupForm").attr("method"), $("#signupForm").attr("action"), $("#signupForm").serialize(), function (result, status, xhr) {
    window.location = result.redirect;
  });
  return false;
};

var SignupForm = function SignupForm(props) {
  //const [email, setEmail] = useState('');
  //Checks if email is valid
  var checkEmail = function checkEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(email)) {
      setEmail(email);
    } else {//error
    }
  };

  return /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fields"
  }, /*#__PURE__*/React.createElement("input", {
    className: "field",
    id: "email",
    type: "text",
    name: "email",
    placeholder: "Email"
  }), /*#__PURE__*/React.createElement("input", {
    className: "field",
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "Password"
  }), /*#__PURE__*/React.createElement("input", {
    className: "field",
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "Retype password"
  })), /*#__PURE__*/React.createElement("input", {
    id: "signupCsrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("button", {
    id: "signupButton",
    type: "submit"
  }, "Create Account"));
}; // const setup = function (csrf) {
//     ReactDOM.render(
//         <SignupForm csrf={csrf} />, document.querySelector('#signup')
//     );
// };


var setup = function setup() {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupForm, null), document.querySelector('#signup'));
}; // const getToken = () => {
//     sendAjax('GET', '/getToken', null, (result) => {
//         setup(result.csrfToken);
//     });
// };


$(document).ready(function () {
  //getToken();
  setup();
});
