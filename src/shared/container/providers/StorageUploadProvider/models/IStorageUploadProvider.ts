export default interface IStorageUploadProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
};
