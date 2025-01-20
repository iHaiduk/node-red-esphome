import { type Node, type NodeDef } from '@node-red/registry';

export interface ESPVariableConfigProperties extends NodeDef {
  variable_name: string
  variable_value: string
  variable_type: string
}

export type ESPVariableConfigType = Node & ESPVariableConfigProperties;
