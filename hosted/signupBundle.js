"use strict";

//import { useState } from 'react'
//Handles signup requests
var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($("#username").val() == '') {
    //TODO: Implement error feedback
    console.log("All fields are required");
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
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fields"
  }, /*#__PURE__*/React.createElement("input", {
    tabIndex: "1",
    className: "field",
    id: "username",
    type: "text",
    name: "username",
    placeholder: "Enter a Unique Code"
  })), /*#__PURE__*/React.createElement("input", {
    id: "signupCsrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("div", {
    className: "signinBtns"
  }, /*#__PURE__*/React.createElement("p", {
    className: "switchText",
    tabIndex: "1"
  }, "Already have an account? ", /*#__PURE__*/React.createElement("a", {
    href: "./login",
    className: "formLink"
  }, "Login!")), /*#__PURE__*/React.createElement("button", {
    tabIndex: "1",
    id: "signupButton",
    type: "submit"
  }, "Sign Up")));
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
