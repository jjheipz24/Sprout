"use strict";

//import '../../hosted/css/styles.css'
var Header = function Header(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "This is a test page"), /*#__PURE__*/React.createElement("h3", null, "This is where the home page will eventually be"));
};

var Main = function Main(props) {
  if (props.email === "" || !props.email) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement("a", {
      href: "/signup"
    }, "Signup")), /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement("a", {
      href: "/login"
    }, "Login")));
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement("a", {
    href: "/logout"
  }, "Logout")));
}; //Grabs the user's email if they are logged in


var loadUserEmail = function loadUserEmail() {
  sendAjax('GET', '/getUserEmail', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Main, {
      email: data.email
    }), document.querySelector('#app'));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(Header, {
    csrf: csrf
  }), document.querySelector('#header'));
  ReactDOM.render( /*#__PURE__*/React.createElement(Main, {
    email: ""
  }), document.querySelector('#app'));
  loadUserEmail();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
