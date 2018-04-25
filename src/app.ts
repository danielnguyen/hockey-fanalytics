import * as dotenv from 'dotenv';
import * as path from 'path';

// Need to load env before importing anything else.
loadEnv().catch(err => {
    console.error('Cannot load environment settings.', err);
    process.exit(1);
});

// Need to come after load env.
import { Server } from './server/common/server';
import { swagger } from './server/common/swagger';
import { RegisterRoutes } from './server/routes/routes';
import { Config } from './server/config';
const localtunnel = require('localtunnel');

// Import API controllers for tsoa crawl
import './server/api/controllers/health';
import './server/api/controllers/NHLAPI';
import './server/api/controllers/Teams';

main().catch(err => {
    console.error('Cannot start Hockey Fanalytics.', err);
    process.exit(1);
});
  
async function loadEnv(): Promise<void> {
    const dotenvFile = process.env.DOTENV || path.join(__dirname, '.env');
    const dotenvConfig = await dotenv.config({path: dotenvFile});
    if (dotenvConfig.error) console.error('Error: ', dotenvConfig.error);
    if (process.env.NODE_ENV !== 'production') console.log(dotenvConfig);
}

async function main(): Promise<void> {    
    const server = new Server();

    const app = server.getExpressApp();

    RegisterRoutes(app);
    swagger(app);

    await server.start(async (webserver: Server) => {
        const info = await server.info();
        console.log('Server is listening at: ' + info.url);
        console.log('** Hockey Fanalytics is online!');
        if (Config.ENABLE_TUNNEL) {
            const tunnel = localtunnel(Config.APP_PORT, {subdomain: Config.LOCALTUNNEL_SUBDOMAIN}, (err: Error, tunnel: any) => {
                if (err) {
                    console.log(err);
                    process.exit();
                }
                console.log("Hockey Fanalytics is available on the web at the following URL: " + tunnel.url);
            });
            
            tunnel.on('error', function() {
                console.log("Encountered errors with local tunnelling.");
                process.exit();
            });
    
            tunnel.on('close', function() {
                console.log("Hockey Fanalytics is no longer available on the web at the localtunnnel.me URL.");
                process.exit();
            });
        }
    });
}