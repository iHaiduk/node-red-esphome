import { type EditorWidgetTypedInputType, type EditorWidgetTypedInputTypeDefinition } from 'node-red';

import { getInput } from '@/share/nodes/input.ts';
import { getNodeInputType } from '@/share/utils/get-env.ts';

export const typedInput = (
  name: string,
  isConfig = false,
  types: (EditorWidgetTypedInputType | EditorWidgetTypedInputTypeDefinition)[] = ['str', 'msg', 'flow', 'global'],
) => {
  getInput(name, isConfig).typedInput({
    types,
    typeField: `#${getNodeInputType(name, isConfig)}`,
  });
};
