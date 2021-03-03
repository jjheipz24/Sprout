//import '../../hosted/css/styles.css'

const Header = (props) => {
    return (
        <div>
            <h1>This is a test page</h1>
            <h3>This is where the home page will eventually be</h3>
        </div>
    )
}

const Main = (props) => {
    if (props.email === "" || !props.email) {
        return (
            <div>
                <button><a href="/signup">Signup</a></button>
                <button><a href="/login">Login</a></button>
            </div>
        );
    }

    return (
        <div>
            <button><a href="/logout">Logout</a></button>
        </div>
    )

}

//Grabs the user's email if they are logged in
const loadUserEmail = () => {
    sendAjax('GET', '/getUserEmail', null, (data) => {
        ReactDOM.render(
            <Main email={data.email} />, document.querySelector('#app')
        );
    });
};

const setup = function (csrf) {
    ReactDOM.render(
        <Header csrf={csrf} />, document.querySelector('#header')
    );

    ReactDOM.render(
        <Main email={""} />, document.querySelector('#app')
    )

    loadUserEmail();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});