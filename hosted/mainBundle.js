"use strict";

//import '../../hosted/css/styles.css'
var Nav = function Nav(props) {
  if (props.username === "" || !props.username) {
    return /*#__PURE__*/React.createElement("nav", {
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
    }, "Login")))));
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
    ReactDOM.render( /*#__PURE__*/React.createElement(Nav, {
      username: data.username
    }), document.querySelector('#nav'));
  });
};

var MessageModal = function MessageModal(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "modal",
    id: "message",
    tabIndex: "-1",
    role: "dialog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-dialog",
    role: "document"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-header"
  }, /*#__PURE__*/React.createElement("img", {
    className: "img-responsive",
    alt: "profile pic of plant",
    src: "assets/images/profilePlants/CactusProfile.png"
  }), /*#__PURE__*/React.createElement("div", {
    id: "modal-content-header"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "modal-title",
    id: "messageTitle"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "messageField",
    id: "messageLabel"
  }, "Let username know they can achieve their goals!"))), /*#__PURE__*/React.createElement("textarea", {
    id: "messageField",
    name: "messageField",
    placeholder: "You're such a hard worker, prosperity will follow!",
    rows: "2",
    cols: "25"
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-primary saveBtn"
  }, "Send")))));
};

var setup = function setup(csrf) {
  // ReactDOM.render(
  //     <Header csrf={csrf} />, document.querySelector('#header')
  // );
  ReactDOM.render( /*#__PURE__*/React.createElement(Nav, {
    username: ""
  }), document.querySelector('#nav'));
  loadUserUsername();
  ReactDOM.render( /*#__PURE__*/React.createElement(MessageModal, null), document.querySelector('#messageModal'));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
