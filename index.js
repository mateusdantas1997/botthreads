const { chromium } = require('playwright');
const fs = require('fs');

// Carrega as frases
const frases = fs.readFileSync('./frases.txt', 'utf-8').split('\n').filter(Boolean);

// Função principal
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    storageState: 'auth.json', // pra não logar toda vez
  });
  const page = await context.newPage();

  // Vai pro Threads via web
  await page.goto('https://www.threads.net/');

  for (let i = 0; i < 10; i++) {
    const frase = frases[Math.floor(Math.random() * frases.length)];

    // Simula clicar e postar
    await page.click('text=Create thread');
    await page.waitForTimeout(1000);
    await page.keyboard.type(frase);
    await page.waitForTimeout(1000);
    await page.click('text=Post');

    console.log(`🔥 Postado: ${frase}`);
    await page.waitForTimeout(5000); // Delay entre posts
  }

  await browser.close();
})();
