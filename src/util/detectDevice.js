export const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
    return true;
  } else {
    return false;
  }
}
