const { JWE } = require('node-jose');

const jose = (publicKey, privateKey) => {
  async function encrypt(raw) {
    if (!raw) throw new Error('Missing raw data.')
    const buffer = new Buffer(JSON.stringify(raw));
    return JWE.createEncrypt(publicKey).update(buffer).final();
  }

  async function decrypt(encrypted) {
    if (!encrypted) throw new Error('Missing encrypted data.')
    return JWE.createDecrypt(privateKey).decrypt(encrypted);
  }

  return { encrypt, decrypt }
}

module.exports = jose;
