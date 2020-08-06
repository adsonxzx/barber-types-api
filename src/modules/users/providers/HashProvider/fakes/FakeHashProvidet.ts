import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    return password;
  }

  public async compareHash(password: string, hashed: string): Promise<boolean> {
    return password === hashed;
  }
}

export default FakeHashProvider;
