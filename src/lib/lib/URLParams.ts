export class URLParams {
  private key;
  private defaultValue;

  constructor(key: string, defaultValue = "") {
    this.key = key;
    this.defaultValue = decodeURIComponent(defaultValue);
  }

  get value() {
    const exp = new URLSearchParams(window.location.search).get(this.key);
    if (exp) return decodeURIComponent(exp);
    return this.defaultValue;
  }

  set value(exp: string) {
    const url = new URL(window.location.href);
    if (exp) url.searchParams.set(this.key, exp);
    else url.searchParams.delete(this.key);
    window.history.replaceState({}, "", url.toString());
  }
}
