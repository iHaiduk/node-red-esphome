import { type Node, type NodeDef } from '@node-red/registry';

export interface ESPMQTTNodeProperties extends NodeDef {
  is_enabled: boolean
  mqtt_broker: string
  mqtt_username: string
  mqtt_password: string
  mqtt_id: string
  topic: string
}

export type ESPMQTTNodeType = Node & ESPMQTTNodeProperties;
