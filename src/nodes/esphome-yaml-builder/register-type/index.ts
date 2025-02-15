import { type EditorRED } from 'node-red';

declare const RED: EditorRED;

RED.nodes.registerType('{{node_name}}', {
  category: 'esphome',
  defaults: {
    name: { value: '' },
    payload: { value: '{}' },
  },
  align: 'right',
  inputs: 1,
  outputs: 1,
  icon: 'fa-file-code-o',
  label: function() {
    return this.name ?? '{{node_name}}';
  },
});
