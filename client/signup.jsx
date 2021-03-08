//import { useState } from 'react'
//Handles signup requests
const handleSignup = e => {
    e.preventDefault();

    if ($("#email").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        //TODO: Implement error feedback
        console.log("All fields are required")
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        //TODO: Implement error feedback
        console.log("Passwords do not match")
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
                <input className="field" id="email" type="text" name="email" placeholder="Email" />
                <input className="field" id="pass" type="password" name="pass" placeholder="Password" />
                <input className="field" id="pass2" type="password" name="pass2" placeholder="Retype password" />
            </div>

            <input id="signupCsrf" type="hidden" name="_csrf" value={props.csrf} />
            <button id="signupButton" type="submit">Create Account</button>

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