const { XMLRPCClient } = require('xmlrpc-client');
const { RRCSTransKey } = require('./types');
const { Method } = require('./Method');
const { RRCSError } = require('./errorcodes');

/**
 *
 * @param {XMLRPCClient} client
 * @param {RRCSTransKey} gen
 * @param {Method} method
 * @returns {Promise<any>}
 */

const Request = (client, gen, method) => {
  const transKey = gen.getNext();
  return new Promise((resolve, reject) => {
    client
      .methodCall(method.method, [transKey, ...method.params])
      .then((response) => {
        if ('TransKey' in response) {
          if (response.TransKey !== transKey) {
            reject({
              Reason: 'TransmissionKey does not match',
              Response: response
            });
          }
        } else {
          if (response[0] !== transKey) {
            reject({
              Reason: 'TransmissionKey does not match',
              Response: response
            });
            return;
          }
          if (response[1] != RRCSError.Success.code) {
            reject(RRCSError.Find(response[1]).description);
            return;
          }
        }
        switch (method.method) {
          case 'SetXp':
          case 'KillXp':
          case 'PressKey':
            resolve(true);
            break;
          case 'GetPortLabel':
          case 'GetPortAlias':
            resolve(response[2]);
            break;
          case 'GetPortsCommandLists':
            resolve(response.CommandLists);
          case 'RegisterForEvents':
            resolve(true);
          case 'UnregisterForEvents':
            resolve(true);
          default:
            reject('no matching method found');
            break;
        }
      });
  });
};

module.exports.RRCSRequest = Request;
