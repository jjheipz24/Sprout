"use strict";

//import { useState } from 'react'
//Handles signup requests
var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($("#email").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
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
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupForm, {
    csrf: csrf
  }), document.querySelector('#signup'));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
