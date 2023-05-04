import express, { Application } from "express";
import { ServiceUnavailable, isHttpError } from "http-errors";
import { getFromConfig } from "configuration";
import { serverConfigSchemaValidation } from "./schema.validation";
import { ServerArguments } from "./types";
import { isAuth } from "./helpers";
import { Middleware } from "./middelware";

export async function Server({ router }: ServerArguments) {
  try {
    const webServer: Application = express();

    const config = getFromConfig({ domain: "server" });

    const isConfigValid = serverConfigSchemaValidation.validate(config);

    if (!config) {
      throw new ServiceUnavailable("could not load server configurations");
    }

    if (isConfigValid.error) {
      throw new ServiceUnavailable(isConfigValid.error.message);
    }

    webServer.use(Middleware.base);

    webServer.get("/health", Middleware.health);

    webServer.use(
      config.prefix,
      isAuth(config.prefix) ? [] : Middleware.auth,
      router
    );

    webServer.use("*", Middleware.catchAll);

    webServer.use(Middleware.error);

    //   if (test) {
    //     return webServer.listen(server.test_port, (): void =>
    //       console.info(server.test_message)
    //     );
    //   }

    return webServer.listen(config.port, (): void =>
      console.info(config.message)
    );
  } catch (error) {
    if (isHttpError(error)) {
      console.error({ message: error.message });
    } else {
      console.error({ message: (error as any).message });
    }
    process.exit(1);
  }
}
