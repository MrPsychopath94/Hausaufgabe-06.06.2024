const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs")
let driver;


beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });
  

  test("Preis und Titel vom IPhone 15 Pro Max 1TB von Otto", async () => {

    await driver.get("https://www.otto.de/")
    const akzeptierenButton = await driver.findElement(By.id("onetrust-accept-btn-handler"))
    await akzeptierenButton.click()

    const suchFeld = await driver.findElement(By.className("squirrel_searchfield ja_squirrel_searchbar_input svelte-11jrfxz"))
    await suchFeld.sendKeys("IPhone 15 Pro Max")

    const suchButton = await driver.findElement(By.className("pl_icon svelte-146qonh"))
    await suchButton.click()

    await driver.wait(until.elementLocated(By.xpath("find_tile__name pl_copy100")),10000)
    const title = await driver.findElement(By.className("find_tile__name pl_copy100")).getText()
    const price = await driver.findElement(By.className("find_tile__retailPrice find_tile__priceValue find_tile__priceValue--red pl_headline50")).getText()
    
    let iPhoneListe = []
    iPhoneListe.push({title,price})
    fs.writeFileSync("otto.json", JSON.stringify(iPhoneListe, null, 2))
    
    expect(title).toBe("Apple iPhone 15 Pro Max 1TB Smartphone (17 cm/6,7 Zoll, 1000 GB Speicherplatz, 48 MP Kamera)")
    expect(price).toBe("1.776,75 €")
  });
  
