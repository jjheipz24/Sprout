/* Require login for certain routes */
const requiresLogin = (req, res, next) => {
    if (!req.session.account) {
      return res.redirect('/');
    }
  
    return next();
  };
  
  
  /* Requires logout for certain routes */
  const requiresLogout = (req, res, next) => {
    if (req.session.account) {
      return res.redirect('/login');
    }
  
    return next();
  };
  
  /* URL must be https */
  const requiresSecure = (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.hostname}${req.url}`);
    }
    return next();
  };
  
  const bypassSecure = (req, res, next) => {
    next();
  };
  
  /* Exports */
  module.exports.requiresLogin = requiresLogin;
  module.exports.requiresLogout = requiresLogout;
  
  /* don't require secure on dev env */
  if (process.env.NODE_ENV === 'production') {
    module.exports.requiresSecure = requiresSecure;
  } else {
    module.exports.requiresSecure = bypassSecure;
  }
