import { type NodeDef, type NodeInstance, type NodePropertyDef } from '@node-red/editor-client';
import { type EditorRED } from 'node-red';

import { ColorsEnum } from '@/share/utils/colors.enum';

declare const RED: EditorRED;

type TransformedType<O extends Record<string, NodePropertyDef<any>>> = {
  [K in keyof O]: O[K]['value'];
};

export const registerNode = <T extends Record<string, NodePropertyDef<any>>>(
  nodeName: string,
  defaults: T,
  oneditprepare?: (this: NodeInstance<TransformedType<T> & { name: string }>) => void,
  oneditsave?: (this: NodeInstance<TransformedType<T> & { name: string }>) => void,
  configs?: Pick<NodeDef<any>, 'color' | 'inputs' | 'outputs' | 'icon'>,
) =>
  RED.nodes.registerType(nodeName, {
    category: 'esphome',
    color: ColorsEnum.Amulet,
    defaults: {
      name: { value: '' },
      ...(defaults as any),
    },
    inputs: 1,
    outputs: 1,
    icon: 'debug.png',
    ...configs,
    label: function() {
      return this.name ?? nodeName;
    },
    oneditprepare,
    oneditsave,
  });
