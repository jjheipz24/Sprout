"use strict";

//Handles login requests
var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($("#username").val() == '') {
    //TODO: Implement error feedback
    console.log("Username is required");
    return false;
  }

  sendAjax($("#loginForm").attr("method"), $("#loginForm").attr("action"), $("#loginForm").serialize(), function (result, status, xhr) {
    window.location = result.redirect;
  });
  return false;
};

var LoginForm = function LoginForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fields"
  }, /*#__PURE__*/React.createElement("input", {
    className: "field",
    id: "username",
    type: "text",
    name: "username",
    placeholder: "Enter Code"
  })), /*#__PURE__*/React.createElement("input", {
    id: "signupCsrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("div", {
    className: "signinBtns"
  }, /*#__PURE__*/React.createElement("button", {
    id: "loginButton",
    type: "submit"
  }, "Login"), /*#__PURE__*/React.createElement("button", {
    id: "secondButton"
  }, /*#__PURE__*/React.createElement("a", {
    href: "./signup"
  }, "Sign Up"))));
};

var setup = function setup(csrf) {
  ReactDOM.render(
  /*#__PURE__*/
  // <LoginForm />, document.querySelector('#login')
  React.createElement(LoginForm, {
    csrf: csrf
  }), document.querySelector('#login'));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
