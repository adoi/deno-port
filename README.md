# deno-port 

[![Build Status](https://travis-ci.com/adoi/deno-port.svg?token=MpMUqcHdDLu9bixjbXWa&branch=master)](https://travis-ci.com/adoi/deno-port)

### Get an available TCP port for your Deno server

## Basic Usage

```ts
  import { serve } from "https://deno.land/std/http/server.ts";
  import { getPort, portRange, portSelection } from "https://deno.land/x/deno-port/mod.ts";

  const s = serve({ port: portSelection([3011, 8080], { log: true }) });
  for await (const req of s) {
    req.respond({ body: "Response from server\n" });
  }

```
The module works with different frameworks of Deno. You can check an example with OAK in the `examples/` folder. It is inspired by get-port, find-free-port or other related packages for nodejs.

-----
## API

### `getPort()`
```ts
getPort(port?: number, options?: { log?: boolean })
```
If port was specified it returns that `port`, if it was not, it returns a random port assigned from the Operating System.

Optional parameters: 
 1. `{ port?: number } `
 2. `{ log?: boolean } `


Example usage: 
```ts
getPort(3000, { log: true }); 

getPort(3000); // by default log is false
```

<br />


### `portSelection([1, 2, ..., n])`
```ts
portSelection(ports: Array<number>, options?: { log?: boolean})
```
Returns a port from the specified selection of ports in the `ports` array. <br />

Required parameters: 
1. `ports: Array<numbers>`

Optional parameters: 
1. `{ log?: boolean } `<br />

Example usage: 
```ts
portSelection([8080, 3001], { log: true }); 

portSelection([3000, 3011]); // by default log is false
```

<br />

### `portRange(min_port, max_port)`
```ts
portRange(min_port: number, max_port: number, options?: { log?: boolean})
```
Returns a port in between `min_port` and `max_port`. <br />

Required parameters: <br />
1. `min_port: number` <br />
1. `max_port: number` <br />

Optional parameters: <br />
1. `{ log?: boolean } `

Example usage: 
```ts
portRange(3001, 8080, { log: true }); 

portRange(3000, 3011); // by default log is false
```

## Other
There are no race conditions when the ports are assigned.