const puppeteer = require('puppeteer');


(async() => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            ignoreDefaultArgs:[
                "--enable-automation",
                "--disable-extensions"
            ],
            args: [
                "--enable-extensions",
                "--enable-usermedia-screen-capturing",
                "--enable-experimental-extension-apis",
                "--enable-experimental-web-platform-features",
                "--load-extension=" + __dirname + "\\tab-capture-extension",
                "--allow-http-screen-capture",
                "--window-size=1296,808"
            ]
        });
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 720 })
    
    await page.exposeFunction('onCustomEventHandler', (e) => {
        console.log(`${e.type} fired`, e.detail || '');
        
        switch(e.detail.type){
            case "keypress":
                return page.keyboard.press(String.fromCharCode(e.detail.kc))
            case "keydown":
                return page.keyboard.down(e.detail.kc)
            case "keyup":
                return page.keyboard.up(e.detail.kc)
            case "click":
                return page.mouse.click(e.detail.x, e.detail.y, {button:"left"});
            case "rclick":
                return page.mouse.click(e.detail.x, e.detail.y, {button:"right"});
        }
      });

      function listenFor(type) {
        return page.evaluateOnNewDocument((type) => {
          document.addEventListener(type, (e) => {
            window.onCustomEventHandler({ type, detail: e.detail });
          });
        }, type);
      }
    
      await listenFor('customEventHandler');
    
    await page.goto('https://www.google.com', {
        waitUntil: 'networkidle0',
      });
})();