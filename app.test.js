import puppeteer from 'puppeteer'
// const faker = require('faker')

const user = {
  username: 'bernini',
  password: 'Gaeta2018',
}

const isDebugging = () => {
  const debuggingMode = {
    headless: false,
    slowMo: 250,
  }
  return process.env.NODE_ENV === 'development' ? debuggingMode : {}
}

let browser
let page


describe('NAVIGATION & AUTH E2E TESTS', () => {
  beforeAll( async () => {
    browser = await puppeteer.launch(isDebugging())
    page = await browser.newPage()
    page.setViewport({width: 1200, height: 2400})
  })
  
  afterAll(() => {
    if (isDebugging()) {
      browser.close()
    }
  })

  beforeEach(() => page.goto('http://localhost:3000'))

  it('h1 loads correctly', async () => {
    const html = await page.$eval('[data-testid="desc"]', e => e.innerHTML)
    console.log(html)
    expect(html).toBe('Your events - networked')
  })
})
