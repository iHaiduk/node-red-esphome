# Node-Red-ESPHome

Welcome to **Node-Red-ESPHome**! This plugin simplifies the generation of YAML configuration files for devices running ESPHome. It allows for quick modifications, efficient configuration generation, and seamless control of ESPHome-powered devices. The plugin can also be integrated for dynamic updates to configurations.

---

## Features
- **Streamlined YAML Generation**: Simplify and accelerate the creation of ESPHome YAML configuration files.
- **Dynamic Configuration Control**: Enable rapid adjustments and updates to ESPHome configurations.
- **Powerful Node Set**: Flexible nodes designed to cover a wide range of use cases.

---

## Installation
To install the plugin, use the Node-RED palette manager or run the following command in your Node-RED directory:

```bash
npm install @esphome/node-red-esphome
```

---

## Nodes Overview

### 1. **esphome-custom**
This node allows you to define custom properties or conditions in JSON format that may not yet be supported by other nodes.

**Parameters:**
- **Payload**: `{ value: '{}' }` - A JSON string to define custom conditions or properties.

### 2. **esphome-variable**
This node is used to create variables in the YAML configuration file for ESPHome devices.

**Parameters:**
- **Variable Name**: `variable_name` - The name of the variable.
- **Variable Value**: `variable_value` - The value of the variable. Supported types: `'str'`, `'msg'`, `'flow'`, `'global'` from the Node-RED environment.
- **Variable Type**: `variable_type` - The type of the variable. Supported types: `Number`, `String`, `Secret`.

### 3. **esphome-mqtt**
This node simplifies the creation of MQTT configurations in the YAML file for ESPHome devices.

**Parameters:**
- **MQTT Broker**: `mqtt_broker` - The connection link. Type: `esphome-variable`.
- **MQTT Username**: `mqtt_username` - The username for the MQTT connection. Type: `esphome-variable`.
- **MQTT Password**: `mqtt_password` - The password for the MQTT connection. Type: `esphome-variable`.
- **MQTT ID**: `mqtt_id` - The device identifier in MQTT. Supported types: `'str'`, `'msg'`, `'flow'`, `'global'` from the Node-RED environment.
- **Topic**: `topic` - The status topic for the device in MQTT. Supported types: `'str'`, `'msg'`, `'flow'`, `'global'` from the Node-RED environment.

---

## Contribution
Contributions are welcome! Follow these steps to get involved:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature: feature-name'`.
4. Push your branch: `git push origin feature-name`.
5. Open a pull request and describe your changes.

### Guidelines
- Ensure your code adheres to the project's style and standards.
- Provide clear descriptions for your pull requests.
- Write tests for any new functionality.

---

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Feel free to reach out with any questions, suggestions, or feedback!

