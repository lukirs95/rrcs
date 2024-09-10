const { Port } = require('./Port');
const Key = require('./VirtualKey');

class Method {
  /**
   * @param {string} ip
   * @param {number} port
   * @returns
   */
  static RegisterForEvents = (ip, port) => {
    return new Method('RegisterForEvents', [ip, port]);
  };

  /**
   * @param {string} ip
   * @returns
   */
  static UnRegisterForEvents = (ip) => {
    return new Method('UnregisterForEvents', [ip]);
  };

  /**
   *
   * @param {Port} source
   * @param {Port} destination
   * @returns
   */
  static SetXp = (source, destination) => {
    return new Method('SetXp', [...source.full, ...destination.full]);
  };

  /**
   *
   * @param {Port} source
   * @param {Port} destination
   * @returns
   */
  static KillXp = (source, destination) => {
    return new Method('KillXp', [...source.full, ...destination.full]);
  };

  static GetAllPorts = () => {
    return new Method('GetAllPorts', []);
  };

  /**
   *
   * @param {Port} destination
   * @returns
   */
  static GetPortLabel = (destination) => {
    return new Method('GetPortLabel', destination.withoutNet);
  };

  static GetPortAlias = (destination) => {
    return new Method('GetPortAlias', destination.full);
  };

  /**
   *
   * @param {Port} source
   * @returns
   */
  static GetPortsCommandLists = (source) => {
    return new Method('GetPortsCommandLists', [...source.full, true, -1]);
  };

  /**
   *
   * @param {Key} source
   * @returns {Method}
   */
  static PressKey = (source) => {
    return new Method('PressKey', [...source.PressKeyValues, true]);
  };

  /**
   *
   * @param {Key} source
   * @returns {Method}
   */
  static ReleaseKey = (source) => {
    return new Method('PressKey', [...source.PressKeyValues, false]);
  };

  /**
   *
   * @param {string} method
   * @param {any[]} params
   */
  constructor(method, params) {
    this._method = method;
    this._params = params;
  }

  get method() {
    return this._method;
  }

  get params() {
    return this._params;
  }
}

module.exports = {
  Method
};
