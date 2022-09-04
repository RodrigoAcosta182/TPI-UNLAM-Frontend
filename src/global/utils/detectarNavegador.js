export function detectarNavegador() {
  var sBrowser;
  var sUsrAg = navigator.userAgent;
  if (sUsrAg.match("CriOS")) {
    sBrowser = "GoogleChrome";
  } else {
    sBrowser = "AppleSafari";
  }
  return sBrowser;
}
