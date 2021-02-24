"use strict";

var LoginForm = function LoginForm(props) {
  return /*#__PURE__*/React.createElement("div", null);
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginForm, {
    csrf: csrf
  }), document.querySelector('#login'));
}; // const getToken = () => {
//     sendAjax('GET', '/getToken', null, (result) => {
//       setup(result.csrfToken);
//     });
//   };


$(document).ready(function () {
  return setup('test');
});
