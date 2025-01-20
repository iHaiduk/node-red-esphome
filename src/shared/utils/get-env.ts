import { isString } from './is-exist';

export const getName = (name: string) => `esphome-${name}`;

export const getNodeInputName = (name: string, isConfig = false) =>
  isConfig ? `node-config-input-${name}` : `node-input-${name}`;

export const getNodeInputType = (name: string, isConfig = false) =>
  isConfig ? `node-config-input-${name}-type` : `node-input-${name}-type`;

export const getNodeInputContainer = (name?: string) =>
  `node-config-container${isString(name) ? `-${name}` : ''}`;

export const getNodeTab = (name?: string) =>
  `node-config${isString(name) ? `-${name}` : ''}-tab`;

export const getNodeBlock = (name?: string) =>
  `node-config${isString(name) ? `-${name}` : ''}-block`;
