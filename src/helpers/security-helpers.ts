export function decodeFromBase64(text = ''): string {
  return Buffer.from(text, 'base64').toString('ascii')
}

export function encodeToBase64(text = ''): string {
  return Buffer.from(text, 'ascii').toString('base64')
}
