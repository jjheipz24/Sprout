"use strict";

//import '../../hosted/css/styles.css'
var Header = function Header(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Home Page"), /*#__PURE__*/React.createElement("h3", null, "Under construction"));
};

var Main = function Main(props) {
  if (props.username === "" || !props.username) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      id: "loginButton"
    }, /*#__PURE__*/React.createElement("a", {
      href: "/logout"
    }, "Logout")));
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement("a", {
    href: "/logout"
  }, "Logout")));
}; //Grabs the user's username if they are logged in


var loadUserUsername = function loadUserUsername() {
  sendAjax('GET', '/getUserName', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(Main, {
      username: data.username
    }), document.querySelector('#app'));
  });
};

var setup = function setup(csrf) {
  // ReactDOM.render(
  //     <Header csrf={csrf} />, document.querySelector('#header')
  // );
  ReactDOM.render( /*#__PURE__*/React.createElement(Main, {
    username: ""
  }), document.querySelector('#app'));
  loadUserUsername();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
