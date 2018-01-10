const SockJS = require('sockjs-client');
const Centrifuge = require('centrifuge');

declare global {
    interface Window { config: any; }
}

interface CentConfig {
    url: string,
    user: string,
    timestamp: string,
    token: string,
    sockJS: any
}

class CentrifugoService{
    config: CentConfig;

    instance: any;

    constructor() {
       if (!window.config) {
          return;
       }
       
       this.config = {
           url: "http://localhost:8000/connection",
           user: window.config.user.toString(),
           timestamp: window.config.timestamp,
           token: window.config.token,
           sockJS: SockJS
       };
    }

    getConfig(): CentConfig {
        return this.config;
    }

    start() {
        this.instance = new Centrifuge(this.config);
        this.instance.startAuthBatching();
        return this.instance;
    }
}

const centrifugoService = new CentrifugoService();

export { centrifugoService, CentConfig };