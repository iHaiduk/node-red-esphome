import { type EditorRED } from 'node-red';

import { typeField, valueField } from '@/node/esphome-variable/module/constants.ts';
import { typedInput } from '@/share/utils/typed-input.ts';

declare const RED: EditorRED;

RED.nodes.registerType('{{node_name}}', {
  category: 'config',
  defaults: {
    name: { value: '' },
    variable_name: {
      value: '',
      required: true,
    },
    [valueField]: {
      value: '',
      required: true,
    },
    [typeField]: {
      value: 'string',
      required: true,
    },
  },
  label: function() {
    return this.name ?? '{{node_name}}';
  },
  oneditprepare: function() {
    typedInput(valueField, true);
    typedInput(typeField, true, [
      {
        value: 'variable_type',
        options: [
          {
            value: 'number',
            label: 'Number',
          },
          {
            value: 'string',
            label: 'String',
          },
          {
            value: 'secret',
            label: 'Secret',
          },
        ],
      },
    ]);
  },
});
