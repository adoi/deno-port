import { serve } from "https://deno.land/std/http/server.ts";

import { getPort } from "./port.ts";
import { logger } from "./utils/logger.ts";
import { portValidation } from "./utils/validationChecks.ts";

// Type guard for selecting port
function portHelper(
  address: Deno.NetAddr | Deno.UnixAddr,
) {
  switch (address.transport) {
    case "tcp" || "udp":
      return address.port;
    default:
      return 0;
  }
}

/**
  * Provides a port to listen to for requests based on a selection of ports we specify in the array.
  * If all selected ports are already in use, a random port is assigned from the OS.
  * 
  * @param {Array<number>} ports
  * @param {{ log: boolean}} options
  * 
  * @returns {number} The port to listen to
  * @public
 */
export function portSelection(
  ports: Array<number>,
  options: { log?: boolean } = {}, // by default we don't log the ports running
): number {
  for (let port of ports) {
    try {
      portValidation(port);
      const server = serve({ port });
      const serPort = portHelper(server.listener.addr);
      logger({ log: options.log, status: "success", port: serPort });
      server.close();
      return serPort;
    } catch (err) {
      if (err.name.includes("AddrInUse")) {
        logger({ log: options.log, status: "error", message: err.message });
        continue;
      }
      throw err;
    }
  }
  return getPort();
}
