import { LocalesEnum } from '@/locale';
import { Row } from '@/share/nodes/component/row.component';
import { Template } from '@/share/nodes/component/template.component';

export default () => {
  return (
    <Template>
      <Row label={LocalesEnum.CommonConfig} name="payload" />
    </Template>
  );
};
