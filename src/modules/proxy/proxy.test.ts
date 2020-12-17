import request from 'supertest'
import app from '../../app'
import { encodeBase64 } from '../../helpers/security-helpers'

describe('proxy', () => {
  it('when we do not have "proxy-url" cookies in request then redirect to /template url', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(302)
    expect(response.headers.location).toBe('/template')
  })

  it('when we visit /template then we return html with form', async () => {
    const response = await request(app).get('/template')

    expect(response.status).toBe(200)
    expect(response.text).toContain(`<form data-testid="our-proxy-form">`)
  })

  it('when we have encoded "https://google.com" in "proxy-url" cookies then redirect to "https://google.com"', async () => {
    const encodedGoogleComString = encodeBase64('https://google.com')
    const response = await request(app)
      .get('/')
      .set('Cookie', [`proxy-url=${encodedGoogleComString}`])

    expect(response.status).toBe(200)
    expect(response.text).toContain('<title>Google</title>')
  })
})
