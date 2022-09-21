import { hash, compare } from 'bcrypt';

import { IHashProvider } from '../IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  async hash(content: string): Promise<string> {
    return hash(content, 8);
  }

  async compare(content: string, hash: string): Promise<boolean> {
    return compare(content, hash);
  }
}
