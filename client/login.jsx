//Handles login requests
const handleLogin = e => {
    e.preventDefault();

    if ($("#username").val() == '') {
        //TODO: Implement error feedback
        console.log("Username is required")
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
                <input className="field" id="username" type="text" name="username" placeholder="username" />
            </div>

            <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
            <div className="signinBtns">
            <button id="loginButton" type="submit">Login</button>
            <button id="secondButton"><a href="./signup">Sign Up</a></button>
            </div>
           
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