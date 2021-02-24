const loginPage = (req, res) => {
    res.render('login');
};

const signupPage = (req, res) => {
    res.render('signup');
}

//Functionality for login
const login = (req, res) => {
    // const req = request;
    // const res = response;
}

//Account creation
const signup = (req, res) => {
    // const req = request;
    // const res = response;
}

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.signupPage = signupPage;
module.exports.signup = signup;