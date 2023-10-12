module.exports.RRCSTransKey = class RRCSTransKey {
  /**
   * Creates new TransKey. startChar needs to be excactly one character, otherwise returns undefined.
   *
   * @param {string} startChar
   * @returns {RRCSTransKey | undefined}
   */
  static Create = (startChar) => {
    if (startChar.length == 1) {
      return new RRCSTransKey(startChar);
    } else {
      return undefined;
    }
  };

  /**
   *
   * @param {string} startChar
   */
  constructor(startChar) {
    this.startChar = startChar;
    this.digit = 0;
  }

  getNext() {
    this.digit = this.digit == 9999999999 ? 0 : this.digit;
    return this.startChar + String(this.digit++).padStart(10, '0');
  }
};

module.exports.RRCSNet = class RRCSNet {
  /**
   * Creates new Source Net. Address needs to be in range 1...255, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSNet | undefined}
   */
  static CreateSourceNet = (address) => RRCSNet.Create(address);

  /**
   * Creates new Destination Net. Address needs to be in range 1...255, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSNet | undefined}
   */
  static CreateDestNet = (address) => RRCSNet.Create(address);

  /**
   * Creates new Member Net. Address needs to be in range 1...255, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSNet | undefined}
   */
  static CreateMemberNet = (address) => RRCSNet.Create(address);

  /**
   * Creates new Net. Address needs to be in range 1...255, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSNet | undefined}
   */
  static Create = (address) => {
    if (address > 0 && address < 256) {
      return new RRCSNet(address);
    } else {
      return undefined;
    }
  };

  /**
   *
   * @param {Number} address
   */
  constructor(address) {
    this._address = address;
  }

  get address() {
    return this._address;
  }
};

module.exports.RRCSNode = class RRCSNode {
  /**
   * Creates new Source Node. Address needs to be in range 1...255, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSNode | undefined}
   */
  static SourceNode = (address) => RRCSNode.Create(address);

  /**
   * Creates new Destination Node. Address needs to be in range 1...255, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSNode | undefined}
   */
  static DestNode = (address) => RRCSNode.Create(address);

  /**
   * Creates new Member Node. Address needs to be in range 1...255, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSNode | undefined}
   */
  static MemberNode = (address) => RRCSNode.Create(address);

  /**
   * Creates new Node. Address needs to be in range 1...255, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSNode | undefined}
   */
  static Create = (address) => {
    if (address > 1 && address < 256) {
      return new RRCSNode(address);
    } else {
      return undefined;
    }
  };

  /**
   *
   * @param {Number} address
   */
  constructor(address) {
    this._address = address;
  }
  get address() {
    return this._address;
  }
};

module.exports.RRCSPort = class RRCSPort {
  /**
   * Creates new Media1 Port. Address needs to be in range 0...127, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSPort | undefined}
   */
  static CreateMedia1 = (address) => {
    address--;
    if (address >= 0 && address <= 127) {
      return RRCSPort.Create(address);
    } else {
      return undefined;
    }
  };

  /**
   * Creates new Media2 Port. Address needs to be in range 0...127, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSPort | undefined}
   */
  static CreateMedia2 = (address) => {
    address--;
    if (address >= 0 && address <= 127) {
      return RRCSPort.Create(address + 512);
    } else {
      return undefined;
    }
  };

  /**
   * Creates new -7 Port. Address needs to be in range 0...127, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSPort | undefined}
   */
  static CreateDash7 = (address) => {
    address--;
    if (address >= 0 && address <= 127) {
      return RRCSPort.Create(address + 1024);
    } else {
      return undefined;
    }
  };

  /**
   * Creates new Madi1 Port. Address needs to be in range 1...64, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSPort | undefined}
   */
  static CreateMadi1 = (address) => {
    if (address >= 1 && address <= 64) {
      return RRCSPort.Create(--address);
    } else {
      return undefined;
    }
  };

  /**
   * Creates new Madi2 Port. Address needs to be in range 1...64, otherwise returns undefined.
   *
   * @param {Number} address
   * @returns {RRCSPort | undefined}
   */
  static CreateMadi2 = (address) => {
    if (address >= 1 && address <= 64) {
      return RRCSPort.Create(--address + 64);
    } else {
      return undefined;
    }
  };

  /**
   * Creates new Legacy (Artist32/64/128) Port. Returns undefined if port and slot is garbage...
   *
   * @param {Number} slot
   * @param {Number} clientCardPort
   * @returns {RRCSPort | undefined}
   */
  static CreateLegacy = (slot, clientCardPort) => {
    slot--;
    clientCardPort--;
    const portAddress = slot * 8 + clientCardPort;

    if (portAddress >= 0 && portAddress <= 1151) {
      return RRCSPort.Create(portAddress);
    } else {
      return undefined;
    }
  };

  /**
   *
   * @param {number} address
   * @returns {RRCSPort | undefined}
   */
  static Create = (address) => {
    if (address >= 0 && address < 1152) {
      return new RRCSPort(address);
    } else {
      return undefined;
    }
  };

  /**
   *
   * @param {number} address
   */
  constructor(address) {
    this._address = address;
  }

  get address() {
    return this._address;
  }
};

module.exports.RRCSPriority = class RRCSPriority {
  static BelowStandard = new RRCSPriority(0, 'BelowStandard');
  static Standard = new RRCSPriority(1, 'Standard');
  static High = new RRCSPriority(2, 'High');
  static Paging = new RRCSPriority(3, 'Paging');
  static Emergency = new RRCSPriority(4, 'Emergency');

  /**
   *
   * @param {Number} priority
   * @returns {RRCSPriority}
   */
  static Find(priority) {
    return Object.values(RRCSPriority).find(
      (prio) => prio.priority == priority
    );
  }

  constructor(priority = 0, name = '') {
    this._priority = priority;
    this._name = name;
  }
  toString() {
    return `RRCSPriority.${this._name}`;
  }

  get name() {
    return this._name;
  }

  get priority() {
    return this._priority;
  }
};

module.exports.RRCSGain = class RRCSGain {
  /**
   * Creates Gain Paramter. Value needs to be in range -36...36
   * @param {number} gain
   */
  constructor(gain) {
    this._gain = gain;
  }

  get gain() {
    return this._gain;
  }

  get gaindB() {
    return this._gain / 2;
  }

  set gain(gain) {
    gain = Math.round(gain);
    if (gain <= -36) {
      this._gain = -36;
    } else if (gain > 36) {
      this._gain = 36;
    } else {
      this._gain = gain;
    }
  }

  set gaindB(gaindB) {
    this.gain = gaindB * 2;
  }
};

module.exports.RRCSStatus = class RRCSStatus {
  static Active = 1;
  static Inactive = 0;
};

module.exports.RRCSGatewayState = class RRCSGatewayState {
  static Working = 'Working';
  static Standby = 'Standby';
};

module.exports.RRCSVolume = class RRCSVolume {
  /**
   * Creates Volume Parameter. Volume needs to be in range 0...255.
   * @param {number} volume
   */
  constructor(volume) {
    this._volume = volume;
  }

  get volume() {
    return this._volume;
  }

  get volumedB() {
    return (this._volume - 230) / 2;
  }

  set volume(volume) {
    volume = Math.round(volume);
    if (volume <= 0) {
      this._volume = 0;
    } else if (volume > 255) {
      this._volume = 256;
    } else {
      this._volume = volume;
    }
  }

  set volumedB(volume) {
    this.volume = (volume + 230) * 2;
  }
};

module.exports.RRCSEthernetLinkMode = {
  AutoNeg: 1,
  TenMbitHalf: 2,
  TenMbitFull: 3,
  HunMbitHalf: 4,
  HunMbitFull: 5
};

module.exports.RRCSTrunkCmdType = {
  CallToPort: 1,
  ListenToPort: 2,
  CallToConference: 4,
  CallToGroup: 5,
  CallToIFB: 48,
  IFBListenToPort: 201,
  ListenToTelexIFBListenSource: 202,
  ListenToArtistIFBMixMinus: 203,
  ListenToArtistIFBInput: 204,
  ConferenceCallToConference: 205
};

module.exports.RRCSLineStatus = {
  Unknown: 0,
  LineIsFree: 1,
  WaitingForConnection: 2,
  LineIsBusy: 3
};
