const { Port } = require('./Port');

class Method {
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
