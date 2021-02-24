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
        }
    })
}