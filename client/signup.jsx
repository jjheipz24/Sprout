//import { useState } from 'react'
//Handles signup requests
const handleSignup = e => {
    e.preventDefault();

    if ($("#username").val() == '') {
        //TODO: Implement error feedback
        console.log("All fields are required")
        return false;
    }

    sendAjax($("#signupForm").attr("method"), $("#signupForm").attr("action"), $("#signupForm").serialize(), (result, status, xhr) => {
        window.location = result.redirect;
    });

    return false;
}

const SignupForm = (props) => {
    return (
        <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">

            <div className="fields">
                <input className="field" id="username" type="text" name="username" placeholder="username" />
            </div>

            <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
            <button id="signupButton" type="submit">Create Account</button>
            <p className="signupExtra">Already have an account? <a className="intextLink" href="./login">Login</a></p>

        </form>
    )
}

const setup = function (csrf) {
    ReactDOM.render(
        <SignupForm csrf={csrf} />, document.querySelector('#signup')
    );
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});