import { type ReactElement } from 'react';

import { LocalesEnum } from '@/locale';
import { Row } from '@/share/nodes/component/row.component';

type TemplateElementType = ChildNode | ReactElement;

export const Template = ({ children }: { readonly children?: TemplateElementType | TemplateElementType[] }) => (
  <>
    <Row label={LocalesEnum.CommonName} name="name" />
    <hr />
    {children}
  </>
);
