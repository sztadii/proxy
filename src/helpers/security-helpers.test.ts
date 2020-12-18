import { encodeFromBase64, decodeToBase64 } from './security-helpers'

describe('security-helpers', () => {
  it('encodeBase64 and decodeBase64 works', async () => {
    const encodeBase64Text = encodeFromBase64('https://google.com')
    const decodeFromBase64Text = decodeToBase64(encodeBase64Text)

    expect(encodeBase64Text).toBe('aHR0cHM6Ly9nb29nbGUuY29t')
    expect(decodeFromBase64Text).toBe('https://google.com')
  })
})
