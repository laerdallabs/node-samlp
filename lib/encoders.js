var thumbprint = require('@auth0/thumbprint');

var removeHeaders = module.exports.removeHeaders = function  (cert, allowCertWhitespace = false) {
  var pem = /-----BEGIN (\w*)-----([^-]*)-----END (\w*)-----/g.exec(cert.toString());
  if (pem && pem.length > 0) {
    let body = pem[2];
    if (!allowCertWhitespace) {
      body = body.replace(/[\n|\r\n]/g, '');
    }
    return body;
  }
  return null;
};

module.exports.thumbprint = function (pem) {
  var cert = removeHeaders(pem);
  return thumbprint.calculate(cert).toUpperCase();
};
