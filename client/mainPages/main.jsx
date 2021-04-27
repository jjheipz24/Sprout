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
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Garden</a>
                        </li> */}
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

class MessageModal extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount() {
        this.$el = $(this.el)
    }

    handleClick() {
        this.$el.hide();
    }
    render() {
        return (
            <div className="modal" id="message" tabIndex="-1" role="dialog" ref={el => this.el = el}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <span className="close" aria-hidden="true" onClick={this.handleClick} aria-label="Close">&times;</span>
                        <div className="modal-header">
                            <img className="img-responsive" id="modalImg" alt="profile pic of plant" src="assets/images/profilePlants/JadeProfile.png" />
                            <div id="modal-content-header">
                                <h5 className="modal-title" id="messageTitle"></h5>
                                <label htmlFor="messageField" id="messageLabel">
                                    Let username know they can achieve their goals!
                        </label>
                            </div>
                            {/* <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button> */}
                        </div>

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
}

class ClearModal extends React.Component {
    constructor(props) {
        super(props)

        this.token = props.csrf;
        this.handleClick = this.handleClick.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
        
    }
    componentDidMount() {
        this.$el = $(this.el)
        
    }

    handleClick() {
        this.$el.hide();
    }

    refreshPage() {
        sendDeleteRequest(this.token, (result, status, xhr) => {
            window.location = result.redirect;
        })
    }

    render() {
        return (
            <div className="modal" id="clear" tabIndex="-1" role="dialog" ref={el => this.el = el}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <span className="close" aria-hidden="true" onClick={this.handleClick} aria-label="Close">&times;</span>
                        <h5 className="modal-title" id="clearTitle">Are you sure you want to clear your garden?</h5>
                        <div className="modal-footer" id="clearFooter">
                            <button type="button" className="btn btn-primary clearBtn" onClick={this.refreshPage}>Yes</button>
                            <button type="button" className="btn btn-primary noClearBtn" onClick={this.handleClick}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
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

    ReactDOM.render(
        <ClearModal csrf={csrf} />, document.querySelector('#clearModal')
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