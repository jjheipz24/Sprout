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
