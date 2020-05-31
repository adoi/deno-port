interface LoggerOptions {
  log?: boolean;
  status?: "error" | "success";
  message?: string;
  port?: number;
}

export function logger({ log, status, message, port }: LoggerOptions) {
  if (log) {
    if (status === "success") {
      console.log(`PORT: ${port}. SUCCESS: Listening for requests.`);
    } else {
      console.log(`ERROR: ${message}. Retrying to get another port.`);
    }
  }
}
