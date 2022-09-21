export interface ITokenProvider {
  sign(
    data: unknown,
    subject: string,
    secret: string,
    expiresIn: string,
  ): Promise<string>;
  verify(token: string, secret: string): Promise<{ sub: string }>;
}