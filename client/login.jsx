//Handles login requests
const handleLogin = e => {
    e.preventDefault();

    if ($("#username").val() == '') {
        //TODO: Implement error feedback
        console.log("Username is required")
        handleError('Username is required');
        return false;
    }


    sendAjax($("#loginForm").attr("method"), $("#loginForm").attr("action"), $("#loginForm").serialize(), (result, status, xhr) => {
        window.location = result.redirect;
    });

    return false;
}

const LoginForm = (props) => {
    return (
        <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">

            <div className="fields">
                <input tabIndex="1" className="field" id="username" type="text" name="username" placeholder="Enter Code" />
            </div>

            <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
            <p className="switchText" tabIndex="1">Don't have an account? <a href="./signup" className="formLink">Sign up!</a></p>
            <div className="signinBtns">
                <button tabIndex="1" id="loginButton" type="submit">Login</button>
            </div>
            <div className="alert alert-danger" role="alert" id="error"></div>
        </form>
    )
}

const setup = function (csrf) {
    ReactDOM.render(
        // <LoginForm />, document.querySelector('#login')
        <LoginForm csrf={csrf} />, document.querySelector('#login')
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
    });
  };

$(document).ready(function (){
    getToken();
});