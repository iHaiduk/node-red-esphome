import { type ReactElement } from 'react';

import { Row } from '@/share/nodes/component/row.component';

export const Template = ({ children }: { readonly children?: ChildNode | ReactElement }) => (
  <>
    <Row label="Name" name="name" />
    <hr />
    {children}
  </>
);
