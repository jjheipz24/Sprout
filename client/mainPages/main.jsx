//import '../../hosted/css/styles.css'

const Nav = (props) => {
    const handleClick = () => {
        $('#onboard').show();
        $('#pixiCanvas').css({ opacity: 0.5 });
        const swiper = new Swiper('.swiper-container', {
            speed: 600,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

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
                            <button className="nav-link" type="submit" id="helpButton" onClick={handleClick} ><img src="assets/images/HelpButton.png"></img></button>
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
                            <img className="img-responsive" id="modalImg" alt="profile pic of plant" src="assets/images/profilePlants/jadeProfile.png" />
                            <div className="modal-content-header">
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
                        <div className="modal-footer" id="messageModalFooter">
                            <button type="button" className="btn btn-primary saveBtn">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class PastMessagesModal extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.$el = $(this.el)
    }

    handleClick() {
        this.$el.hide();
    }
    render() {
        return (
            <div className="modal" id="pastMessages" tabIndex="-1" role="dialog" ref={el => this.el = el}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content" id="pastModalContent">
                        <span className="close" id="pastClose" aria-hidden="true" onClick={this.handleClick} aria-label="Close">&times;</span>
                        <div className="modal-header">
                            <img className="img-responsive" id="pastModalImg" alt="profile pic of plant" src="assets/images/profilePlants/jadeProfile.png" />
                            <div className="pastHeader modal-content-header">
                                <h5 className="modal-title" id="pastMessageTitle">Message History</h5>
                                <label htmlFor="messageField" id="pastMessageLabel">
                                    You started this jade plant to bring you prosperity! Let's see what the community has to add:
                                </label>
                            </div>
                        </div>
                        <div className="modal-body" id="pastMessageBody" ref={mesgDiv => this.mesgDiv = mesgDiv}>
                            <p id="message1"></p>
                            <p id="message2">Add a message to grow this plant!</p>
                            {/* <p >
                                Insert message
                            </p> */}
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

class ErrorAlert extends React.Component {
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
            <div className="alert alert-danger alert-dismissible errorAlert" role="alert" ref={el => this.el = el}>
                 <button type="button" className="btn-close" aria-label="Close" onClick={this.handleClick}></button>
                <p className="alertMessage">This is an alert</p>    
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
        <PastMessagesModal />, document.querySelector('#pastMessageModal')
    )

    ReactDOM.render(
        <MessageModal />, document.querySelector('#messageModal')
    )

    ReactDOM.render(
        <ClearModal csrf={csrf} />, document.querySelector('#clearModal')
    )

    ReactDOM.render(
        <ErrorAlert />, document.querySelector("#errorAlert")
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