export function decodeBase64(text = ''): string {
  return Buffer.from(text, 'base64').toString('ascii')
}

export function encodeBase64(text = ''): string {
  return Buffer.from(text, 'ascii').toString('base64')
}
