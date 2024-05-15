const JWT = require("jsonwebtoken");

const secret = "@manDn@321";

function createTokenForUser(user) {
  const payload = {
    id: user.id,
    email: user.email,
    profileImageUrl: user.profileImage,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);

  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
