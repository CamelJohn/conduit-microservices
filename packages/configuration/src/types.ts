import { Helpers } from "./helpers";

export namespace Dotenv {
  export interface Domain {
    SERVER_PORT: string;
    SERVER_PREFIX: string;
    SERVER_LISTEN_MESSAGE: string;
  }
  
  export interface Server {
    port: number;
    prefix: string;
    message: string;
  }

  export interface Contract {
    server: Server;
  }
  
  export type StringFields = (keyof Helpers.MappedValues)[];

  export interface GetFromConfigArguments {
    domain: Helpers.MappedKeys,
    // fields?: StringFields;
  }
}
