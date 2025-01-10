import { isString } from './is-exist';

export const getName = (name: string) => `esphome-${name}`;

export const getNodeInputName = (name: string, isConfig: boolean) =>
  isConfig ? `node-config-input-${name}` : `node-input-${name}`;

export const getNodeInputContainer = (name?: string) =>
  `node-input-config-container${isString(name) ? `-${name}` : ''}`;
