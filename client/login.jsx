const LoginForm = (props) => {
    return (
        <div>

        </div>
    )
}

const setup = function (csrf) {
    ReactDOM.render(
        <LoginForm csrf={csrf} />, document.querySelector('#login')
    );
};

// const getToken = () => {
//     sendAjax('GET', '/getToken', null, (result) => {
//       setup(result.csrfToken);
//     });
//   };

$(document).ready(() => setup('test'));