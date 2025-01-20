import { LocalesEnum } from '@/locale';

const locales: Record<LocalesEnum, string> = {
  [LocalesEnum.CommonConfig]: 'Конфигурация',
  [LocalesEnum.CommonType]: 'Тип',
  [LocalesEnum.CommonValue]: 'Значение',
  [LocalesEnum.CommonName]: 'Имя',

  [LocalesEnum.MqttConnection]: 'Подключение',
  [LocalesEnum.MqttSecurity]: 'Безопасность',
  [LocalesEnum.MqttBrokerTitle]: 'MQTT Брокер',
  [LocalesEnum.MqttBrokerID]: 'MQTT ID',
  [LocalesEnum.MqttBrokerStatus]: 'Тема статуса',
  [LocalesEnum.MqttBrokerUsername]: 'MQTT Имя пользователя',
  [LocalesEnum.MqttBrokerPassword]: 'MQTT Пароль',
};

export default locales;
