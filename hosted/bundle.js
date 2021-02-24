"use strict";

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
    }
  });
};
