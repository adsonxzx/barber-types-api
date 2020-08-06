export default interface IHashProvider {
  generateHash(password: string): Promise<string>;
  compareHash(password: string, hashed: string): Promise<boolean>;
}
