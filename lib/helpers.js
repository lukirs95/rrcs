const { XMLRPCClient } = require('xmlrpc-client');
const { Method } = require('./Method');
const { Port } = require('./Port');
const Key = require('./VirtualKey');
const { RRCSRequest } = require('./request');
const { RRCSNet, RRCSPort, RRCSNode, RRCSTransKey } = require('./types');

/**
 *
 * @param {XMLRPCClient} client
 * @param {RRCSTransKey} transKeyGen
 * @param {Port} port
 * @returns {Promise<string>}
 */
function GetPortLabel(client, transKeyGen, port) {
  const getPortLabelMethod = Method.GetPortAlias(port);
  return RRCSRequest(client, transKeyGen, getPortLabelMethod);
}

/**
 *
 * @param {XMLRPCClient} client
 * @param {RRCSTransKey} transKeyGen
 * @param {Port} port
 * @returns {Promise<Object[]>}
 */
function GetVirtualKeys(client, transKeyGen, port) {
  const getPortCommandList = Method.GetPortsCommandLists(port);

  return RRCSRequest(client, transKeyGen, getPortCommandList).then((response) =>
    Promise.resolve(
      response
        .filter((cmd) => cmd.CommandPosition.PositionType == 'virtual-key')
        .map((cmd) => {
          const pos = cmd.CommandPosition;
          const destPortAddress = cmd.CommandList[0].DestinationPortAddress;
          const destNet = new RRCSNet(destPortAddress.Net);
          const destNode = new RRCSNode(destPortAddress.Node);
          const destPort = new RRCSPort(destPortAddress.Port);
          const Destination = new Port(destNet, destNode, destPort);
          return {
            Dest: Destination,
            Key: new Key(
              port,
              pos.IsInput,
              pos.Page,
              pos.ExpansionPanel,
              pos.KeyNumber,
              true
            )
          };
        })
    )
  );
}

/**
 *
 * @param {XMLRPCClient} client
 * @param {RRCSTransKey} transKeyGen
 * @param {Port} port
 * @returns {Promise<Object[]>}
 */
function BuildVirtualPanel(client, transKeyGen, port) {
  return GetVirtualKeys(client, transKeyGen, port).then((keys) =>
    Promise.all(
      keys.map((key) => GetPortLabel(client, transKeyGen, key.Dest))
    ).then((portLabels) => {
      return Promise.resolve(
        portLabels.map((portLabel, index) => {
          keys[index].label = portLabel;
          return keys[index];
        })
      );
    })
  );
}

module.exports.BuildVirtualPanel = BuildVirtualPanel;
