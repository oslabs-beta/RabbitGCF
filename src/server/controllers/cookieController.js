const cookieController = {};

// To handle setting cookies for OAUTH users
cookieController.setSession = (req, res, next) => {
  res.cookie('SSID', req.user._id);
}

cookieController.clearCookies = (req, res, next) => {
  res.clearCookie('SSID');
  res.clearCookie('connect.sid');
  return next();
}

module.exports = cookieController;