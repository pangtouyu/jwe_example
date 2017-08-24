const { JWE, JWK } = require('node-jose');
const keygen = require('generate-rsa-keypair');
const jose = require('./jose');

const rawKeys = keygen();
const makeKey = pem => JWK.asKey(pem, 'pem');


async function start() {

  const publicKey = await makeKey(rawKeys.public);
  const privateKey = await makeKey(rawKeys.private);

  const raw = {
    iss: 'test',
    exp: new Date().getTime() + 3600,
    sub: {
      test: 'This is a test',
    },
  };

  const { encrypt, decrypt } = jose(publicKey, privateKey);

  return encrypt(raw).then((encrypted) => decrypt(encrypted));

};

return start()
  .then((result) => {
  console.log('decrypted', JSON.parse(result.payload))
}, (err) => {
  console.error(err);
})
