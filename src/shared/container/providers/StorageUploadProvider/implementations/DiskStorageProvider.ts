import path from 'path';
import fs from 'fs';
import upload from '@config/upload';
import IStorageUploadProvider from '../models/IStorageUploadProvider';

class DiskStorageProvider implements IStorageUploadProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tempFolder, file),
      path.resolve(upload.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
