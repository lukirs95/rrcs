module.exports.RRCSError = class RRCSError {
  static Success = new RRCSError(0, 'Success', 'Success');
  static TransactionKeyInvalid = new RRCSError(
    1,
    'TransactionKeyInvalid',
    'Transaction key invalid'
  );
  static NetAddressInvalid = new RRCSError(
    2,
    'NetAddressInvalid',
    'Net address invalid'
  );
  static NodeAddressInvalid = new RRCSError(
    3,
    'NodeAddressInvalid',
    'Node address invalid'
  );
  static PortAddressInvalid = new RRCSError(
    4,
    'PortAddressInvalid',
    'Port address invalid'
  );
  static SlotNoInvalid = new RRCSError(
    5,
    'SlotNoInvalid',
    'Slot number invalid'
  );
  static InputGainInvalid = new RRCSError(
    6,
    'InputGainInvalid',
    'Input Gain invalid'
  );
  static IPAddressInvalid = new RRCSError(
    7,
    'IPAddressInvalid',
    'IP-address invalid'
  );
  static TCPPortInvalid = new RRCSError(
    8,
    'TCPPortInvalid',
    'TCP-Port invalid'
  );
  static LabelInvalid = new RRCSError(9, 'LabelInvalid', 'Label invalid');
  static ConferencePositionInvalid = new RRCSError(
    10,
    'ConferencePositionInvalid',
    'Conference position invalid'
  );
  static OperationFailedArtistNotConnected = new RRCSError(
    11,
    'OperationFailedArtistNotConnected',
    'Operation failed, because Artist-network not connected'
  );
  static OperationFailedRouteDoesNotExist = new RRCSError(
    12,
    'OperationFailedRouteDoesNotExist',
    'Operation failed, because route does not exist'
  );
  static OperationNotPossibleGatewayStandby = new RRCSError(
    13,
    'OperationNotPossibleGatewayStandby',
    'Operation not possible, because gateway is standby'
  );
  static XMLRPCParametersWrong = new RRCSError(
    14,
    'XMLRPCParametersWrong',
    'XML-RPC parameters wrong for this request'
  );
  static InvalidConferenceNotFound = new RRCSError(
    15,
    'InvalidConferenceNotFound',
    'Invalid conference or conference not found'
  );
  static InvalidConferenceMemberNotFound = new RRCSError(
    16,
    'InvalidConferenceMemberNotFound',
    'Invalid conference member or conference member not found'
  );
  static InvalidPriority = new RRCSError(
    17,
    'InvalidPriority',
    'Invalid priority'
  );
  static InvalidGPIONumber = new RRCSError(
    18,
    'InvalidGPIOValue',
    'Invalid GPIO number'
  );
  static InvalidGainValue = new RRCSError(
    19,
    'InvalidGainValue',
    'Invalid gain value'
  );
  static Timeout = new RRCSError(20, 'Timeout', 'Timeout');
  static NoPermission = new RRCSError(21, 'NoPermission', 'No permission');
  static ObjectDoesNotExist = new RRCSError(
    22,
    'ObjectDoesNotExist',
    'Object does not exist'
  );
  static NoUSBDongleAvailable = new RRCSError(
    23,
    'NoUSBDongleAvailable',
    'No USB Dongle Available'
  );
  static PortIsNotOnline = new RRCSError(
    24,
    'PortIsNotOnline',
    'Port is not online'
  );
  static ObjectPropertyNotSupported = new RRCSError(
    25,
    'ObjectPropertyNotSupported',
    'Object property not supported'
  );
  static LimitExceeded = new RRCSError(26, 'LimitExceeded', 'Limit exceeded');
  static GenericError = new RRCSError(99, 'GenericError', 'Generic Error');

  /**
   *
   * @param {Number} errorCode
   * @returns {RRCSError}
   */
  static Find(errorCode) {
    return Object.values(RRCSError).find((error) => error.code == errorCode);
  }

  constructor(code = 0, name = '', description = '') {
    this.code = code;
    this.name = name;
    this.description = description;
  }
  toString() {
    return `RRCSError.${this.name}`;
  }
};
