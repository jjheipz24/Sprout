"use strict";

var handleError = function handleError(message) {
  console.log('message', $('#errorMessage'));
  $('#error').children('#errorMessage').remove();
  $('#error').append("<p id=\"errorMessage\">".concat(message, "</p>"));
  $('#error').fadeIn(200);
};

var sendAjax = function sendAjax(method, action, data, callback) {
  $.ajax({
    cache: false,
    type: method,
    url: action,
    data: data,
    dataType: "json",
    success: callback,
    error: function error(xhr, status, _error) {
      console.log(xhr.responseText); //const messageObj = JSON.parse(xhr.responseText);

      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var sendDeleteRequest = function sendDeleteRequest(token, callback) {
  $.ajax({
    url: '/clear',
    type: 'DELETE',
    success: callback,
    headers: {
      'x-csrf-token': token
    },
    error: function error(xhr, status, _error2) {
      var messageObj = JSON.parse(xhr.responseText);
      console.log(messageObj);
    }
  });
};
