//import '../../hosted/css/styles.css'

const Header = (props) => {
    return(
        <div>
            <h1>This is a test page</h1>
            <h3>This is where the home page will eventually be</h3>
        </div>
    )
}

const setup = function (csrf) {
    ReactDOM.render(
        <Header csrf={csrf} />, document.querySelector('#app')
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