"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

var MessageModal = /*#__PURE__*/function (_React$Component) {
  _inherits(MessageModal, _React$Component);

  var _super = _createSuper(MessageModal);

  function MessageModal(props) {
    var _this;

    _classCallCheck(this, MessageModal);

    _this = _super.call(this, props);
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MessageModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.$el = $(this.el);
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.$el.hide();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "modal",
        id: "message",
        tabIndex: "-1",
        role: "dialog",
        ref: function ref(el) {
          return _this2.el = el;
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "modal-dialog",
        role: "document"
      }, /*#__PURE__*/React.createElement("div", {
        className: "modal-content"
      }, /*#__PURE__*/React.createElement("span", {
        className: "close",
        "aria-hidden": "true",
        onClick: this.handleClick,
        "aria-label": "Close"
      }, "\xD7"), /*#__PURE__*/React.createElement("div", {
        className: "modal-header"
      }, /*#__PURE__*/React.createElement("img", {
        className: "img-responsive",
        id: "modalImg",
        alt: "profile pic of plant",
        src: "assets/images/profilePlants/JadeProfile.png"
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
    }
  }]);

  return MessageModal;
}(React.Component);

var PastMessagesModal = /*#__PURE__*/function (_React$Component2) {
  _inherits(PastMessagesModal, _React$Component2);

  var _super2 = _createSuper(PastMessagesModal);

  function PastMessagesModal(props) {
    var _this3;

    _classCallCheck(this, PastMessagesModal);

    _this3 = _super2.call(this, props);
    _this3.handleClick = _this3.handleClick.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(PastMessagesModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.$el = $(this.el);
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.$el.hide();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "modal",
        id: "pastMessages",
        tabIndex: "-1",
        role: "dialog",
        ref: function ref(el) {
          return _this4.el = el;
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "modal-dialog",
        role: "document"
      }, /*#__PURE__*/React.createElement("div", {
        className: "modal-content"
      }, /*#__PURE__*/React.createElement("span", {
        className: "close",
        id: "pastClose",
        "aria-hidden": "true",
        onClick: this.handleClick,
        "aria-label": "Close"
      }, "\xD7"), /*#__PURE__*/React.createElement("div", {
        className: "modal-header"
      }, /*#__PURE__*/React.createElement("img", {
        className: "img-responsive",
        id: "pastModalImg",
        alt: "profile pic of plant",
        src: "assets/images/profilePlants/jadeProfile.png"
      }), /*#__PURE__*/React.createElement("div", {
        className: "pastHeader",
        id: "modal-content-header"
      }, /*#__PURE__*/React.createElement("h5", {
        className: "modal-title",
        id: "pastMessageTitle"
      }, "Message History"), /*#__PURE__*/React.createElement("label", {
        htmlFor: "messageField",
        id: "pastMessageLabel"
      }, "You started this jade plant to bring you prosperity! Let's see what the community has to add:"))), /*#__PURE__*/React.createElement("div", {
        className: "modal-body",
        id: "pastMessageBody",
        ref: function ref(mesgDiv) {
          return _this4.mesgDiv = mesgDiv;
        }
      }))));
    }
  }]);

  return PastMessagesModal;
}(React.Component);

var ClearModal = /*#__PURE__*/function (_React$Component3) {
  _inherits(ClearModal, _React$Component3);

  var _super3 = _createSuper(ClearModal);

  function ClearModal(props) {
    var _this5;

    _classCallCheck(this, ClearModal);

    _this5 = _super3.call(this, props);
    _this5.token = props.csrf;
    _this5.handleClick = _this5.handleClick.bind(_assertThisInitialized(_this5));
    _this5.refreshPage = _this5.refreshPage.bind(_assertThisInitialized(_this5));
    return _this5;
  }

  _createClass(ClearModal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.$el = $(this.el);
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.$el.hide();
    }
  }, {
    key: "refreshPage",
    value: function refreshPage() {
      sendDeleteRequest(this.token, function (result, status, xhr) {
        window.location = result.redirect;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "modal",
        id: "clear",
        tabIndex: "-1",
        role: "dialog",
        ref: function ref(el) {
          return _this6.el = el;
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "modal-dialog",
        role: "document"
      }, /*#__PURE__*/React.createElement("div", {
        className: "modal-content"
      }, /*#__PURE__*/React.createElement("span", {
        className: "close",
        "aria-hidden": "true",
        onClick: this.handleClick,
        "aria-label": "Close"
      }, "\xD7"), /*#__PURE__*/React.createElement("h5", {
        className: "modal-title",
        id: "clearTitle"
      }, "Are you sure you want to clear your garden?"), /*#__PURE__*/React.createElement("div", {
        className: "modal-footer",
        id: "clearFooter"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-primary clearBtn",
        onClick: this.refreshPage
      }, "Yes"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-primary noClearBtn",
        onClick: this.handleClick
      }, "No")))));
    }
  }]);

  return ClearModal;
}(React.Component);

var setup = function setup(csrf) {
  // ReactDOM.render(
  //     <Header csrf={csrf} />, document.querySelector('#header')
  // );
  ReactDOM.render( /*#__PURE__*/React.createElement(Nav, {
    username: ""
  }), document.querySelector('#nav'));
  loadUserUsername();
  ReactDOM.render( /*#__PURE__*/React.createElement(PastMessagesModal, null), document.querySelector('#pastMessageModal'));
  ReactDOM.render( /*#__PURE__*/React.createElement(MessageModal, null), document.querySelector('#messageModal'));
  ReactDOM.render( /*#__PURE__*/React.createElement(ClearModal, {
    csrf: csrf
  }), document.querySelector('#clearModal'));
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
