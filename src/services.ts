import {DIContainer} from "@wessberg/di";
import {FileLoader, IFileLoader} from "@wessberg/fileloader";
import {FileSaver, IFileSaver} from "@wessberg/filesaver";
import {ILoggerService} from "./service/logger/i-logger-service";
import {LoggerService} from "./service/logger/logger-service";
import {IConfig} from "./config/i-config";
import {config} from "./config/config";
import {IServer} from "./server/i-server";
import {Server} from "./server/server";
import {IRequestHandler} from "./server/request-handler/i-request-handler";
import {RequestHandler} from "./server/request-handler/request-handler";
import {RegisteredControllers} from "./controller/controller/registered-controllers";
import {IStaticController} from "./controller/static/i-static-controller";
import {StaticController} from "./controller/static/static-controller";
import {IPolyfillController} from "./controller/polyfill/i-polyfill-controller";
import {PolyfillController} from "./controller/polyfill/polyfill-controller";
import {IStaticBl} from "./bl/static/i-static-bl";
import {StaticBl} from "./bl/static/static-bl";
import {IPolyfillBl} from "./bl/polyfill/i-polyfill-bl";
import {PolyfillBl} from "./bl/polyfill/polyfill-bl";
import {IMemoryRegistryService} from "./service/registry/polyfill-registry/i-memory-registry-service";
import {MemoryRegistryService} from "./service/registry/polyfill-registry/memory-registry-service";
import {IPolyfillBuilderService} from "./service/polyfill-builder/i-polyfill-builder-service";
import {PolyfillBuilderService} from "./service/polyfill-builder/polyfill-builder-service";
import {ICacheRegistryService} from "./service/registry/cache-registry/i-cache-registry-service";
import {CacheRegistryService} from "./service/registry/cache-registry/cache-registry-service";
import {IApiService} from "./service/api/i-api-service";
import {ApiService} from "./service/api/api-service";

export const container = new DIContainer();

// Utilities
container.registerSingleton<IFileLoader, FileLoader>();
container.registerSingleton<IFileSaver, FileSaver>();

// Services
container.registerSingleton<ILoggerService, LoggerService>();
container.registerSingleton<IMemoryRegistryService, MemoryRegistryService>();
container.registerSingleton<ICacheRegistryService, CacheRegistryService>();
container.registerSingleton<IPolyfillBuilderService, PolyfillBuilderService>();
container.registerSingleton<IApiService, ApiService>();

// Configuration
container.registerSingleton<IConfig>(() => config);

// Server
container.registerSingleton<IServer, Server>();
container.registerSingleton<IRequestHandler, RequestHandler>();

// Business Logic
container.registerSingleton<IStaticBl, StaticBl>();
container.registerSingleton<IPolyfillBl, PolyfillBl>();

// Controller
container.registerSingleton<IStaticController, StaticController>();
container.registerSingleton<IPolyfillController, PolyfillController>();
container.registerSingleton<RegisteredControllers>(() => [container.get<IStaticController>(), container.get<IPolyfillController>()]);
