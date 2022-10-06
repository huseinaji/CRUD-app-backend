const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (payload, expiresIn = '2h') => {
    return jwt.sign(payload, 'aksesTransaksi', { 
      expiresIn
    });
  },
  readToken: (req, res, next) => {
    req.token = req.get('Authorization').split(' ')[1];
    // console.log(req.token);
    jwt.verify(req.token, 'aksesTransaksi', (err, decode) => {
      // console.log(decode);
      if (err) {
        return res.status(400).send({
          msg: 'otentikasi error',
          err: err
        })
      }
      req.dataToken = decode;
      next();
    })
  }
}