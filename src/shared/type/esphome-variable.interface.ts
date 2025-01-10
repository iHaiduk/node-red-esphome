import { type Node } from 'node-red';

export interface EsphomeVariableInterface extends Node<EsphomeVariableInterface> {
  variable_name: string
  variable_value: string
  variable_type: string
}
