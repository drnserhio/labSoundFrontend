export class SelectAlbumHelper {

  public static selectAlbumSaveToLocalStorage(albumName: string) {
    localStorage.setItem("albumName", albumName);
  }

  public static getAlbumNameForLocalStorage() {
    return localStorage.getItem("albumName");
  }

  static deleteAlbumNameForLocalCache() {
    localStorage.removeItem('albumName')
  }
}
