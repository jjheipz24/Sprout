"use strict";

//import '../../hosted/css/styles.css'
var Header = function Header(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Home Page"), /*#__PURE__*/React.createElement("h3", null, "Under construction"));
};

var Main = function Main(props) {
  if (props.username === "" || !props.username) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("nav", {
      className: "navbar navbar-expand-lg"
    }, /*#__PURE__*/React.createElement("img", {
      alt: "logo",
      src: "assets/images/logo.png"
    }), /*#__PURE__*/React.createElement("button", {
      className: "navbar-toggler",
      type: "button",
      "data-toggle": "collapse",
      "data-target": "#navbarSupportedContent",
      "aria-controls": "navbarSupportedContent",
      "aria-expanded": "false",
      "aria-label": "Toggle navigation"
    }, /*#__PURE__*/React.createElement("span", {
      className: "navbar-toggler-icon"
    })), /*#__PURE__*/React.createElement("div", {
      className: "nav-bar-items"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "navbar-nav mr-auto"
    }, /*#__PURE__*/React.createElement("li", {
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link",
      href: "/signup"
    }, "Signup")), /*#__PURE__*/React.createElement("li", {
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link",
      href: "/login"
    }, "Login"))))));
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("nav", {
    className: "navbar navbar-expand-lg"
  }, /*#__PURE__*/React.createElement("img", {
    alt: "logo",
    src: "assets/images/logo.png"
  }), /*#__PURE__*/React.createElement("button", {
    className: "navbar-toggler",
    type: "button",
    "data-toggle": "collapse",
    "data-target": "#navbarSupportedContent",
    "aria-controls": "navbarSupportedContent",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation"
  }, /*#__PURE__*/React.createElement("span", {
    className: "navbar-toggler-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-bar-items"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav mr-auto"
  }, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "#"
  }, "Garden")), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: "/logout"
  }, "Logout"))))));
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
