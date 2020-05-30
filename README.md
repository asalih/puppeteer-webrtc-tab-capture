# Puppeteer WebRTC Tab Capture Example

![Diagram](images/helloworld.gif)

This is an experimental project that capturing chromium tab screen and sharing and managing it using WebRTC. This repo based on [WebRTC-Experiment](https://github.com/muaz-khan/WebRTC-Experiment)

## Installation

- We need [RTCMultiConnectionServer](https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RTCMultiConnection-Server)
  - Run ``npm install rtcmulticonnection-server``
  - Start server ``node server.js``
- Run client.js in the client directory for to managing remote puppeteer tab.
  - Run ``node client.js``
- Now launch a puppeteer in puppeteer-launcher directory. Also puppeteer starts with a chrome extension as a worker for tab capturing. It's inside the puppeteer-launcher/tab-capture-extension
  - Run ``node launcher.js``