import { prop } from 'remeda';

import { type EsphomeVariableInterface } from '@/share/type/esphome-variable.interface';

import { toSnakeCase } from './to-snake-case';

export const getVariableValue = <T extends EsphomeVariableInterface>(node: T) => {
  const value = prop(node, 'variable_value');
  const type = prop(node, 'variable_type');

  return type === 'secret' ? `!secret ${value}` : value;
};

export const getVariableName = <T extends EsphomeVariableInterface>(node: T) => `$${toSnakeCase(node.variable_name)}`;
