let latestBase64Image = null;

export function setLatestBase64Image(base64Image) {
  latestBase64Image = base64Image;
}

export function getLatestBase64Image() {
  return latestBase64Image;
}