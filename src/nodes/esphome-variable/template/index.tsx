import { LocalesEnum } from '@/locale';
import { typeField, valueField } from '@/node/esphome-variable/module/constants.ts';
import { Row } from '@/share/nodes/component/row.component';
import { Template } from '@/share/nodes/component/template.component';

export default () => {
  return (
    <Template>
      <Row label={LocalesEnum.CommonType} name={typeField} isConfig />
      <Row label={LocalesEnum.CommonValue} name={valueField} isConfig />
    </Template>
  );
};
