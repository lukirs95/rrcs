const { XMLRPCClient } = require('xmlrpc-client');
const { RRCSTransKey } = require('./types');
const { Method } = require('./Method');
const { RRCSError } = require('./errorcodes');
/**
 *
 * @param {XMLRPCClient} client
 * @param {RRCSTransKey} gen
 * @param {Method} method
 * @returns {Promise<Object>}
 */

module.exports.Request = (client, gen, method) => {
  const transKey = gen.getNext();
  return new Promise((resolve, reject) => {
    client
      .methodCall(method.method, [transKey, ...method.params])
      .then((response) => {
        if (response[0] !== transKey) {
          reject('TransmissionKey does not match');
          return;
        }
        if (response[1] != RRCSError.Success.code) {
          reject(RRCSError.Find(response[1]).description);
          return;
        }
        switch (method.method) {
          case 'SetXp':
            resolve(true);
            break;
          case 'KillXp':
            resolve(true);
            break;
          case 'GetPortLabel':
            resolve(response[2]);
            break;
          case 'GetPortAlias':
            resolve(response[2]);
            break;

          default:
            reject('no matching method found');
            break;
        }
      });
  });
};
