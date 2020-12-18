import request from 'supertest'
import app from '../../app'
import { encodeToBase64 } from '../../helpers/security-helpers'

describe('proxy-controller', () => {
  it('when the request does not have "proxy-url" cookie then redirect to /template url', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(302)
    expect(response.headers.location).toBe('/template')
  })

  it('when we visit /template url then we return html with form', async () => {
    const response = await request(app).get('/template')

    expect(response.status).toBe(200)
    expect(response.text).toContain(`<form>`)
  })

  it('when the request has encoded url in "proxy-url" cookie then redirect to that url', async () => {
    const encodedGoogleComString = encodeToBase64('https://google.com')
    const response = await request(app)
      .get('/')
      .set('Cookie', [`proxy-url=${encodedGoogleComString}`])

    expect(response.status).toBe(200)
    expect(response.text).toContain('<title>Google</title>')
  })
})
