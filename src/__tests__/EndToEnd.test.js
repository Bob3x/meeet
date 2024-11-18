import puppeteer from "puppeteer";

describe('filter events by city', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.city');
    });

    afterAll(() => {
        browser.close();
    });

    test('When user hasnt searched for a city, show upcoming events from all cities', async () => {
        const events = await page.$('.event');
        expect(events).toBeDefined();
    });

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.type('.city', 'Berlin, Germany');
        const suggestions = await page.$('.suggestions');
        expect(suggestions).toBeDefined();
    });

    test('User can select a city from the suggested list', async () => {
        await page.click('.suggestions li');
        const city = await page.$('.city');
        expect(city).toBeDefined();
    });
});

describe("show/hide event details", () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test("An event element is collapsed by default", async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    test("User can expand an event to see details", async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-btn');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });
});

describe('Specify Number of Events', () => {
    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('Show all available events when user hasnt specify any number', async () => {
        const events = await page.$$('.event');
        expect(events.length).toBe(32);
    });

    test('User can change number of events', async () => {
        await page.$eval('#number-of-events input', input => input.value = '');
        await page.type('#number-of-events input', '10');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(2000); // Wait for the events to update
    
        const events = await page.$$('.event');
        expect(events.length).toBe(10);
    });
})
