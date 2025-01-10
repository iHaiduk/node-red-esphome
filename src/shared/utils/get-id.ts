export const getButtonId = (id: string) => `button_${id}`;

export const getLightId = (id: string) => `light_${id}`;

export const getSwitchId = (id: string) => `switch_${id}`;

export const getGPIOId = (id: string) => `gpio_${id}`;

export const getComponentIdByType = (type: string, id: string) => {
  switch (type) {
    case 'light': {
      return getLightId(id);
    }
    case 'switch': {
      return getSwitchId(id);
    }
    case 'button': {
      return getButtonId(id);
    }
  }
};
