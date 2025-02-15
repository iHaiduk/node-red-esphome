import { type NodeDef } from '@node-red/registry';
import { type NodeInitializer } from 'node-red';

import { type ESPVariableConfigType } from '../module/types';

const nodeInit: NodeInitializer = (RED): void => {
  function ESPNodeRegister(this: ESPVariableConfigType, config: NodeDef): void {
    RED.nodes.createNode(this, config);
  }

  RED.nodes.registerType('{{node_name}}', ESPNodeRegister);
};

export default nodeInit;
