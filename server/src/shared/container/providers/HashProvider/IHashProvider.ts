export interface IHashProvider {
  hash(content: string): Promise<string>;
  compare(content: string, hash: string): Promise<boolean>;
}