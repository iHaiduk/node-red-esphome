import { type NodeInitializer } from 'node-red';

import { type ESPVariableConfigProperties, type ESPVariableConfigType } from '../module/types';

const nodeInit: NodeInitializer = (RED): void => {
  function ESPCustomNodeConstructor(this: ESPVariableConfigType, config: ESPVariableConfigProperties): void {
    RED.nodes.createNode(this, config);
  }

  RED.nodes.registerType('{{node_name}}', ESPCustomNodeConstructor);
};

export default nodeInit;
