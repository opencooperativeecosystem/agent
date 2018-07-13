import puppeteer from 'puppeteer'
// const faker = require('faker')
// const pti = require('puppeteer-to-istanbul')


const user = {
  username: 'ivan',
  password: 'Gaeta2018',
}

const isDebugging = () => {
  const debuggingMode = {
    headless: false,
    slowMo: 50,
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
    // await Promise.all([
    //   page.coverage.startJSCoverage(),
    // ]);
  })
  
  afterAll(() => {
    if (isDebugging()) {
      // const jsCoverage = await Promise.all([
      //   page.coverage.stopJSCoverage(),
      // ]);
      pti.write(jsCoverage)
      browser.close()
    }
  })

  beforeEach(() => page.goto('http://localhost:3000'))

  it('redirects to /login', async () => {
    const html = await page.$eval('[data-testid="desc"]', e => e.innerHTML)
    expect(html).toBe('Your events - networked')
  })
  it('If not logged and try to access a priv route, redirects to /login', async () => {
    await page.goto('http://localhost:3000/canvas/409')
    const html = await page.$eval('[data-testid="desc"]', e => e.innerHTML)
    expect(html).toBe('Your events - networked')
  })
  it('attempts to login with wrong credential', async () => {
    await page.click('[name="username"]')
    await page.type('[name="username"]', user.username)
    
    await page.click('[name="password"]')
    await page.type('[name="password"]', '1234')

    await page.click('[data-testid="login"]')

    await page.waitForSelector('[data-testid="error"]')
  }, 16000)
  it('attempts to login with correct credential', async () => {
    await page.click('[name="username"]')
    await page.type('[name="username"]', user.username)
    
    await page.click('[name="password"]')
    await page.type('[name="password"]', user.password)

    await page.click('[data-testid="login"]')

    await page.waitForSelector('[data-testid="success"]')
  }, 16000)
  it('gets redirected to dashboard page after successfully login', async () => {
    await page.waitForSelector('[data-testid="agent-name"]')
  }, 16000)
  
  // it('lands to plan page clicking on the first plan on the dashboard page ', async () => {
  //   // await page.waitForSelector('[data-testid="plan_0"]')
  //   await page.goto('http://localhost:3000/canvas/409')
  //   await page.waitFor(20000)
  //   await page.waitForSelector('[data-testid="edit-plan"]')
  // }, 16000)
  
  it('logs out and automatically is redirected to /login', async () => {
    await page.waitFor(2000)
    await page.click('[data-testid="log-out"]')
    await page.waitForSelector('[data-testid="desc"]')
  }, 16000)
})
