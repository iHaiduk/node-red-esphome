import { getNodeInputName } from '../utils/get-env';

export const getInput = (name: string, isConfig = false) => $(`#${getNodeInputName(name, isConfig)}`);
