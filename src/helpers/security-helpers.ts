export function decodeToBase64(text = ''): string {
  return Buffer.from(text, 'base64').toString('ascii')
}

export function encodeFromBase64(text = ''): string {
  return Buffer.from(text, 'ascii').toString('base64')
}
