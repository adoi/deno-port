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

// Get ports from selection, if all selected ports are already in use, assign a free port from the OS
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
