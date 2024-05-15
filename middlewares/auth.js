const { validateToken } = require("../services/auth");

function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const cookieValue = req.cookies[cookieName];

    if (!cookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(cookieValue);
      req.user = userPayload;
    } catch (error) {
      console.log(error);
    }

    return next();
  };
}

module.exports = {
  checkAuthCookie,
};
