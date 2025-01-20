import { type NodeInitializer } from 'node-red';

import { type EsphomeVariableInterface } from '@/share/type/esphome-variable.interface.ts';
import { getVariableName } from '@/share/utils/get-variable.ts';

import { type ESPMQTTNodeProperties, type ESPMQTTNodeType } from '../module/types';

const nodeInit: NodeInitializer = (RED): void => {
  function ESPCustomNodeConstructor(this: ESPMQTTNodeType, config: ESPMQTTNodeProperties): void {
    RED.nodes.createNode(this, config);

    this.on('input', (_, send) => {
      send({
        payload: {
          ...(config.is_enabled && {
            mqtt: {
              broker: getVariableName(RED.nodes.getNode(config.mqtt_broker) as EsphomeVariableInterface),
              username: getVariableName(RED.nodes.getNode(config.mqtt_username) as EsphomeVariableInterface),
              password: getVariableName(RED.nodes.getNode(config.mqtt_password) as EsphomeVariableInterface),
              id: config.mqtt_id,
              birth_message: {
                topic: config.topic,
                payload: 'online',
              },
              will_message: {
                topic: config.topic,
                payload: 'offline',
              },
            },
          }),
        },
      });
    });
  }

  RED.nodes.registerType('{{node_name}}', ESPCustomNodeConstructor);
};

export default nodeInit;
