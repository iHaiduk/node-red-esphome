import { LocalesEnum } from '@/locale';
import {
  brokerField,
  MQTT_CONNECTION, MQTT_SECURITY,
  MQTT_TAB_ID, mqttIdField, passwordField,
  topicField, usernameField,
} from '@/node/esphome-mqtt/module/constants.ts';
import { Row } from '@/share/nodes/component/row.component.tsx';
import { Tab } from '@/share/nodes/component/tabs.component.tsx';
import { Template } from '@/share/nodes/component/template.component';
import { getNodeBlock } from '@/share/utils/get-env.ts';

export default () => {
  return (
    <Template>
      <Tab name={MQTT_TAB_ID} />
      <div id={getNodeBlock(MQTT_CONNECTION)}>
        <Row label={LocalesEnum.MqttBrokerTitle} name={brokerField} />
        <Row label={LocalesEnum.MqttBrokerID} name={mqttIdField} />
        <Row label={LocalesEnum.MqttBrokerStatus} name={topicField} />
      </div>
      <div id={getNodeBlock(MQTT_SECURITY)} style={{ display: 'none' }}>
        <Row label={LocalesEnum.MqttBrokerUsername} name={usernameField} />
        <Row label={LocalesEnum.MqttBrokerPassword} name={passwordField} />
      </div>
    </Template>
  );
};
