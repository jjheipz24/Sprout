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
                <input tabIndex="1" className="field" id="username" type="text" name="username" placeholder="Enter a Unique Code" />
            </div>

            <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
            <div className="signinBtns">
            <p className="switchText" tabIndex="1">Already have an account? <a href="./login" className="formLink">Login!</a></p>
                <button tabIndex="1" id="signupButton" type="submit">Sign Up</button>
            </div>
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