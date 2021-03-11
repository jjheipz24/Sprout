//import '../../hosted/css/styles.css'

const Header = (props) => {
    return (
        <div>
            <h1>Home Page</h1>
            <h3>Under construction</h3>
        </div>
    )
}

const Main = (props) => {
    if (props.username === "" || !props.username) {
        return (
            <div>
                <nav className="navbar navbar-expand-lg">
                    <img alt="logo" src="assets/images/logo.png"/>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="nav-bar-items">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/signup">Signup</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Login</a>
                            </li> 
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

    return (
        <div>
         <nav className="navbar navbar-expand-lg">
             <img alt="logo" src="assets/images/logo.png"/>
             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
             </button>

             <div className="nav-bar-items">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Garden</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/logout">Logout</a>
                        </li> 
                    </ul>
                </div>
         </nav>
         </div>
    )
}

//Grabs the user's username if they are logged in
const loadUserUsername = () => {
    sendAjax('GET', '/getUserName', null, (data) => {
        ReactDOM.render(
            <Main username={data.username} />, document.querySelector('#app')
        );
    });
};

const setup = function (csrf) {
    // ReactDOM.render(
    //     <Header csrf={csrf} />, document.querySelector('#header')
    // );

    ReactDOM.render(
        <Main username={""} />, document.querySelector('#app')
    )

    loadUserUsername();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});