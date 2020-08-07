import IStorageUploadProvider from '../models/IStorageUploadProvider';

class FakeStorageUploadProvider implements IStorageUploadProvider {
  private files: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.files.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.files.findIndex((filename) => filename === file);

    if (fileIndex) {
      this.files.splice(fileIndex, 1);
    }
  }
}

export default FakeStorageUploadProvider;
