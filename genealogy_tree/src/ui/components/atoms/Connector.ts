import { Frame } from "./Frame";

export const Connector = (options: Partial<ConnectorNode> = {}) => {
  const { width, height, ...innerOptions } = options;
  const Connector = figma.createConnector();
  for (const [key, value] of Object.entries(innerOptions)) {
    Connector[key] = value;
  }
  // if (width !== undefined && height !== undefined) {
  //   Connector.resize(width, height);
  // }
  return Connector;
};
