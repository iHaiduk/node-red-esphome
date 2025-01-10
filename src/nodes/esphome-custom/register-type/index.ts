import { type EditorRED } from 'node-red';

import { getInput } from '@/share/nodes/input';

declare const RED: EditorRED;

RED.nodes.registerType('{{node_name}}', {
  category: 'esphome',
  color: '#AAAA66',
  defaults: {
    name: { value: '' },
    payload: { value: '{}' },
  },
  inputs: 1,
  outputs: 1,
  icon: 'debug.png',
  label: function() {
    return this.name ?? '{{node_name}}';
  },
  oneditprepare: function() {
    getInput('payload').typedInput({ types: ['json'] });
  },
});
