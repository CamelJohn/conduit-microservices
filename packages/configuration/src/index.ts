import { Helpers } from "./helpers";
import { Dotenv } from "./types";

export function getFromConfig({
  domain,
  // fields,
}: Dotenv.GetFromConfigArguments) {
  const configMap = Helpers.getFormattedConfig();

  // if (!fields) {
  //   return configMap.get(domain);
  // }

  // const multiple = Helpers.getMultipleFields({ domain, fields });

  // return multiple.reduce((map, fieldRecord) => {
  //   const value = configMap.get(fieldRecord.domain)?.[fieldRecord.field] ?? undefined;
  //   map[fieldRecord.field] = value;
  // }, {} as any);

  return configMap.get(domain);
}