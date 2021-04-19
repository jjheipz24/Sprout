const handleError = (message) => {
    console.log('message',  $('#errorMessage'));
    if($('#error').hasChildNodes()) {
        $('#error').firstChild.remove();
    } 
    $('#error').append(`<p id="errorMessage">${ message }</p>`)
    $('#error').fadeIn(200);
  };

const sendAjax = (method, action, data, callback) => {
    $.ajax({
        cache: false,
        type: method,
        url: action,
        data: data,
        dataType: "json",
        success: callback,
        error: (xhr, status, error) => {
            console.log(xhr.responseText);
            //const messageObj = JSON.parse(xhr.responseText);
            const messageObj = JSON.parse(xhr.responseText);

            handleError(messageObj.error);
        }
    })
}