import { LocalesEnum } from '@/locale';

const locales: Record<LocalesEnum, string> = {
  [LocalesEnum.CommonConfig]: 'Config',
  [LocalesEnum.CommonType]: 'Type',
  [LocalesEnum.CommonValue]: 'Value',
  [LocalesEnum.CommonName]: 'Name',

  [LocalesEnum.MqttConnection]: 'Connection',
  [LocalesEnum.MqttSecurity]: 'Security',
  [LocalesEnum.MqttBrokerTitle]: 'MQTT Broker',
  [LocalesEnum.MqttBrokerID]: 'MQTT ID',
  [LocalesEnum.MqttBrokerStatus]: 'Topic status',
  [LocalesEnum.MqttBrokerUsername]: 'MQTT Username',
  [LocalesEnum.MqttBrokerPassword]: 'MQTT Password',
};

export default locales;
