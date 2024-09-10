const { Port } = require('./Port');

module.exports = class Key extends Port {
  /**
   *
   * @param {Port} sourcePort
   */
  constructor(
    sourcePort,
    isInput,
    page,
    expansionPanel,
    keyNumber,
    isVirtualKey
  ) {
    super(sourcePort._net, sourcePort._node, sourcePort._port);
    this.isInput = isInput;
    this.page = page;
    this.expansionPanel = expansionPanel;
    this.keyNumber = keyNumber;
    this.isVirtualKey = isVirtualKey;
    this.name = null;
  }

  get PressKeyValues() {
    return [
      this.node.address,
      this.port.address,
      this.isInput,
      this.page,
      this.expansionPanel,
      this.keyNumber,
      this.isVirtualKey
    ];
  }
};
