const { RRCSNet, RRCSPort, RRCSNode } = require('./types');

module.exports.Port = class Port {
  /**
   *
   * @param {RRCSNet} net
   * @param {RRCSNode} node
   * @param {RRCSPort} port
   */
  constructor(net, node, port) {
    this._net = net;
    this._node = node;
    this._port = port;
  }

  get full() {
    return [this._net.address, this._node.address, this._port.address];
  }

  get withoutNet() {
    return [this._node.address, this._port.address];
  }

  get onlyPort() {
    return this._port.address;
  }

  get net() {
    return this._net;
  }

  get node() {
    return this._node;
  }

  get port() {
    return this._port;
  }
};
