import { useState } from 'react'
//Handles signup requests
const handleSignup = e => {
    e.preventDefault();

    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        //TODO: Implement error feedback
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        //TODO: Implement error feedback
        return false;
    }

    sendAjax($("#signupForm").attr("method"), $("#signupForm").attr("action"), $("#signupForm").serialize(), (result, status, xhr) => {
        window.location = result.redirect;
    });

    return false;
}

const SignupForm = (props) => {
    const [email, setEmail] = useState('');

    //Checks if email is valid
    const checkEmail = (email) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(email)) {
            setEmail(email);
        }
        else {
            //error
        }
    }
    return (
        <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST">

            <div className="fields">
                <input className="field" id="email" type="text" name="email" value={email} onChange={e => setEmail(email)} onBlur={() => checkEmail(email)} />
            </div>

        </form>
    )
}

// const setup = function (csrf) {
//     ReactDOM.render(
//         <SignupForm csrf={csrf} />, document.querySelector('#signup')
//     );
// };

const setup = function () {
    ReactDOM.render(
        <SignupForm />, document.querySelector('#signup')
    );
};

// const getToken = () => {
//     sendAjax('GET', '/getToken', null, (result) => {
//         setup(result.csrfToken);
//     });
// };

$(document).ready(function () {
    //getToken();
    setup();
});