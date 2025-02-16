import { type NodeInitializer } from 'node-red';

import { type ESPLightNodeProperties, type ESPLightNodeType } from '../module/types';

const nodeInit: NodeInitializer = (RED): void => {
  function ESPNodeRegister(this: ESPLightNodeType, config: ESPLightNodeProperties): void {
    RED.nodes.createNode(this, config);
  }

  RED.nodes.registerType('{{node_name}}', ESPNodeRegister);
};

export default nodeInit;
