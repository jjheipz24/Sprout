"use strict";

//Handles login requests
var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($("#email").val() == '') {
    //TODO: Implement error feedback
    console.log("Email is required");
    return false;
  }

  if ($("#pass").val() == '') {
    //TODO: Implement error feedback
    console.log("Password is required");
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
  })), /*#__PURE__*/React.createElement("input", {
    id: "signupCsrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("button", {
    id: "loginButton",
    type: "submit"
  }, "Login"), /*#__PURE__*/React.createElement("p", {
    className: "loginExtra"
  }, "Don't have an account? ", /*#__PURE__*/React.createElement("a", {
    className: "intextLink",
    href: "./signup"
  }, "Sign Up")), /*#__PURE__*/React.createElement("p", {
    className: "loginExtra"
  }, /*#__PURE__*/React.createElement("a", {
    className: "intextLink",
    href: "./signup"
  }, "Forgot Password?")));
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
