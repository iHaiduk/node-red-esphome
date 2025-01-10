import { type Node, type NodeDef } from '@node-red/registry';

export interface ESPLightNodeProperties extends NodeDef {
  platform: string
  output: string
}

export type ESPLightNodeType = Node;
