export function encodeString(text: string): string {
  return Buffer.from(text).toString('base64')
}

export function decodeString(text: string): string {
  return Buffer.from(text, 'base64').toString('ascii')
}
