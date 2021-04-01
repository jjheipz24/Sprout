//import '../../hosted/css/styles.css'

const Nav = (props) => {
    if (props.username === "" || !props.username) {
        return (
            <nav className="navbar navbar-expand-lg">
                <img alt="logo" src="assets/images/logo.png" />
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

        );
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <img alt="logo" src="assets/images/logo.png" />
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
            <Nav username={data.username} />, document.querySelector('#nav')
        );
    });
};

const MessageModal = (props) => {
    return (
        <div className="modal" id="message" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Share a Positive Message</h5>
                    {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> */}
                    <label htmlFor="messageField">
                        Let username know they can achieve their goals!
                     </label>
                </div>
                <label></label>
                 
                <textarea id="messageField" name="messageField" placeholder="You're such a hard worker, prosperity will follow!" rows="2" cols="25">
                </textarea>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary saveBtn">Send</button>
                </div>
            </div>
        </div>
    </div>
    )
}

const setup = function (csrf) {
    // ReactDOM.render(
    //     <Header csrf={csrf} />, document.querySelector('#header')
    // );

    ReactDOM.render(
        <Nav username={""} />, document.querySelector('#nav')
    )

    loadUserUsername();

    ReactDOM.render(
        <MessageModal />, document.querySelector('#messageModal')
    )
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});