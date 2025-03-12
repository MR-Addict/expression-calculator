export class URLParams {
  private key;
  private defaultValue;

  constructor(key: string, defaultValue = "") {
    this.key = key;
    this.defaultValue = decodeURIComponent(defaultValue);
  }

  get value() {
    const val = new URLSearchParams(window.location.search).get(this.key);
    if (val) return decodeURIComponent(val);
    return this.defaultValue;
  }

  set value(val: string) {
    const url = new URL(window.location.href);
    if (!val) url.searchParams.delete(this.key);
    else if (val !== this.value) url.searchParams.set(this.key, val);
    window.history.replaceState({}, "", url.toString());
  }
}
