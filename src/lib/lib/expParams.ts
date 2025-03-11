function getExp() {
  const exp = new URLSearchParams(window.location.search).get("exp");
  if (exp) return decodeURIComponent(exp);
  return "";
}

function setExp(exp: string) {
  const url = new URL(window.location.href);
  if (exp) url.searchParams.set("exp", exp);
  else url.searchParams.delete("exp");
  window.history.replaceState({}, "", url.toString());
}

export const expParams = {
  get: getExp,
  set: setExp
};
