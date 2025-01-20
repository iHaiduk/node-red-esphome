import { type EditorRED } from 'node-red';

import { LocalesEnum } from '@/locale';
import {
  MQTT_CONNECTION,
  MQTT_ID,
  MQTT_IS_ENABLED, MQTT_SECURITY,
  MQTT_TAB_ID,
  MQTT_TOPIC_STATUS, mqttIdField,
  topicField,
} from '@/node/esphome-mqtt/module/constants.ts';
import { getInput } from '@/share/nodes/input';
import { createTabs } from '@/share/nodes/tabs.ts';
import { getNodeBlock, getNodeTab } from '@/share/utils/get-env.ts';
import { typedInput } from '@/share/utils/typed-input.ts';

declare const RED: EditorRED;

RED.nodes.registerType('{{node_name}}', {
  category: 'esphome',
  color: '#C0DEED',
  defaults: {
    name: { value: '' },
    is_enabled: { value: MQTT_IS_ENABLED },
    mqtt_broker: {
      value: '',
      required: true,
      type: '{{esphome_type}}',
    },
    mqtt_username: {
      value: '',
      required: true,
      type: '{{esphome_type}}',
    },
    mqtt_password: {
      value: '',
      required: true,
      type: '{{esphome_type}}',
    },
    [mqttIdField]: { value: MQTT_ID },
    [topicField]: {
      value: MQTT_TOPIC_STATUS,
      required: true,
    },
  },
  inputs: 1,
  outputs: 1,
  icon: 'font-awesome/fa-cloud',
  label: function() {
    return this.name ?? '{{node_name}}';
  },
  oneditprepare: function() {
    if (this.mqtt_id === undefined) getInput(mqttIdField).val(MQTT_ID);

    typedInput(mqttIdField);
    typedInput(topicField);

    const connectionBlock = $(`#${getNodeBlock(MQTT_CONNECTION)}`);
    const securityBlock = $(`#${getNodeBlock(MQTT_SECURITY)}`);

    const { tabsInstance } = createTabs(MQTT_TAB_ID, [
      {
        id: MQTT_CONNECTION,
        label: this._(LocalesEnum.MqttConnection),
      },
      {
        id: MQTT_SECURITY,
        label: this._(LocalesEnum.MqttSecurity),
      },
    ], (tab) => {
      connectionBlock.toggle(tab.id === getNodeTab(MQTT_CONNECTION));
      securityBlock.toggle(tab.id === getNodeTab(MQTT_SECURITY));
    });

    setTimeout(() => tabsInstance.resize(), 0);
  },
});
