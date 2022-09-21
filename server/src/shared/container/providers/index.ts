import { container } from "tsyringe";
import { IHashProvider } from "./HashProvider/IHashProvider";
import { BcryptHashProvider } from "./HashProvider/implementations/BcryptHashProvider";
import { JWTTokenProvider } from "./TokenProvider/implementations/JWTTokenProvider";
import { ITokenProvider } from "./TokenProvider/ITokenProvider";

container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider);

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);