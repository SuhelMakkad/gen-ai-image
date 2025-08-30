export const base64ToBlob = (base64: string, mimeType: string) => {
  // Decode the Base64 string
  const byteCharacters = atob(base64);

  // Create an array of byte values
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Convert to a real typed array
  const byteArray = new Uint8Array(byteNumbers);

  // Create and return a Blob object
  return new Blob([byteArray], { type: mimeType });
};
