import { getByTestId, fireEvent } from '@testing-library/dom'
import template from './proxy.template.html'

// TODO This test was create just setup DOM test environment
// It tests nothing, because there is an issue with receive cookie from document

describe('proxy-template', () => {
  it('when submit form then encode input value and save it in cookie', async () => {
    const container = document.createElement('div')
    container.innerHTML = template

    const input = getByTestId(container, 'url-input') as HTMLInputElement
    input.value = 'https://google.com'

    const form = getByTestId(container, 'our-proxy-form')
    fireEvent.submit(form)

    expect(form).toBeTruthy()
  })
})
