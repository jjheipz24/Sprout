"use strict";

//Handles login requests
var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($("#username").val() == '') {
    //TODO: Implement error feedback
    console.log("Username is required");
    handleError('Username is required');
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
    tabIndex: "1",
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
  }), /*#__PURE__*/React.createElement("p", {
    className: "switchText",
    tabIndex: "1"
  }, "Don't have an account? ", /*#__PURE__*/React.createElement("a", {
    href: "./signup",
    className: "formLink"
  }, "Sign up!")), /*#__PURE__*/React.createElement("div", {
    className: "signinBtns"
  }, /*#__PURE__*/React.createElement("button", {
    tabIndex: "1",
    id: "loginButton",
    type: "submit"
  }, "Login")), /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger",
    role: "alert",
    id: "error"
  }));
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
