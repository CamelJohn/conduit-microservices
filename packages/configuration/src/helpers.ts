import dotenv from "dotenv";
import dotenvExpand, { DotenvExpandOutput } from "dotenv-expand";
import { Dotenv } from "./types";

export namespace Helpers {
  export type MappedKeys = keyof Dotenv.Contract;

  export type MappedValues = Dotenv.Server;

  export type ParsedRawExpanded = DotenvExpandOutput["parsed"];

  interface GetMultipleFieldsArguments {
    domain: MappedKeys;
    fields: Dotenv.StringFields;
  }

  function parseDomain(config: string): Dotenv.Domain {
    return JSON.parse(config);
  }

  function stringify(config: ParsedRawExpanded) {
    return JSON.stringify(config);
  }

  function load() {
    const config = dotenv.config();
    const expanded = dotenvExpand.expand(config);

    if (expanded.error) {
      throw new Error(expanded.error.message);
    }

    if (!expanded.parsed) {
      throw new Error("missing configurtion");
    }

    return expanded.parsed;
  }

  function toNumber(field: string) {
    return parseInt(field, 10);
  }

  function buildMapFrom(domain: Dotenv.Domain) {
    return new Map<MappedKeys, MappedValues>([
      [
        "server",
        {
          port: toNumber(domain.SERVER_PORT),
          prefix: domain.SERVER_PREFIX,
          message: domain.SERVER_LISTEN_MESSAGE,
        },
      ],
    ]);
  }

  export function getFormattedConfig() {
    const config = load();

    const string = stringify(config);

    const domain = parseDomain(string);

    return buildMapFrom(domain);
  }

  export function getMultipleFields({
    domain,
    fields,
  }: GetMultipleFieldsArguments) {
    return [...fields].map((field) => ({ domain, field }));
  }
}
