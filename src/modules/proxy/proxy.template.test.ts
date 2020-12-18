import { getByPlaceholderText, getByText } from '@testing-library/dom'
import { DOMWindow, JSDOM } from 'jsdom'
import template from './proxy.template.html'
import { encodeBase64 } from '../../helpers/security-helpers'

describe('proxy-template', () => {
  let window: DOMWindow
  let document: Document
  let container: HTMLElement

  beforeEach(() => {
    const dom = new JSDOM(template, { runScripts: 'dangerously' })
    window = dom.window
    document = window.document
    container = document.body
  })

  function fillFormInput(text: string) {
    const input = getByPlaceholderText(
      container,
      'Enter URL'
    ) as HTMLInputElement
    input.value = text
  }

  it('when paste "https://google.com" into input and submit form then encode value into cookie', async () => {
    fillFormInput('https://google.com')

    getByText(container, 'Open').click()

    const cookies = `proxy-url=${encodeBase64('https://google.com')}`
    expect(document.cookie).toBe(cookies)
  })

  it('call window.open after successful submit form', async () => {
    window.open = jest.fn()

    fillFormInput('https://google.com')
    getByText(container, 'Open').click()

    expect(window.open).toHaveBeenCalledTimes(1)
    expect(window.open).toHaveBeenCalledWith('/')
  })

  it('when input is empty and user click "Open" then trigger alert and do not open new window', async () => {
    window.open = jest.fn()
    window.alert = jest.fn()

    getByText(container, 'Open').click()

    expect(window.alert).toHaveBeenCalledTimes(1)
    expect(window.alert).toHaveBeenCalledWith('Please fill input')
    expect(window.open).toHaveBeenCalledTimes(0)
  })
})
