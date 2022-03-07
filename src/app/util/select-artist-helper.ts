export class SelectArtistHelper {

  public static selectArtisNametSaveToLocalStorage(albumName: string) {
    localStorage.setItem("artist", albumName);
  }

  public static getArtistNameForLocalStorage() {
    return localStorage.getItem("artist");
  }

  public static removeArtistnameForLocalCache() {
    localStorage.removeItem('artist');
  }

}
