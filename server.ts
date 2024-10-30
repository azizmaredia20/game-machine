import * as fs from 'node:fs';
import * as path from 'node:path';
import https from "https";
import { fileURLToPath } from 'node:url';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';

import apiRouter, { connectDB } from './server/app.js';

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.VITEST;
const isProd = process.env.NODE_ENV === 'production'
const root: string = process.cwd();

const resolve = (_path: string) => path.resolve(__dirname, _path);

const indexProd: string = isProd
    ? fs.readFileSync(resolve('client/index.html'), 'utf-8')
    : ''

// Connect to DB
connectDB();

const createServer = async () => {
    const options = {
        key: fs.readFileSync('/Users/azizmaredia/Desktop/Docs/Aziz/certificate/private-rsa.key', 'utf-8'),
        cert: fs.readFileSync('/Users/azizmaredia/Desktop/Docs/Aziz/certificate/itencoders.com/3df030ad3cf2e671.crt', 'utf-8')
    };

    const app: Express = express();

    const httpsServer = https.createServer(options, app);

    app.use(express.json());
    app.use(cookieParser());

    let vite: any;

    if (!isProd) {
        vite = await (await import('vite')).createServer({
            root,
            logLevel: isTest ? 'error' : 'info',
            server: {
                middlewareMode: true,
                watch: {
                    usePolling: true,
                    interval: 100
                }
            },
            appType: "custom"
        })

        app.use(vite.middlewares)
    }

    if (isProd) {
        app.use((await import('compression')).default())

        app.use(
            (await import('serve-static')).default(resolve('./client'), {
                index: false
            })
        )
    }

    // api routes
    app.use('/api', apiRouter);

    app.use('*', async (req, res, next) => {
        if (req.originalUrl.includes('/api')){
            return next();
        } 
        try {

            const url = req.originalUrl;

            let template, render;

            if (!isProd) {
                template = fs.readFileSync(resolve('index.html'), 'utf8')
                template = await vite.transformIndexHtml(url, template)

                render = (await vite.ssrLoadModule('/src/entry-server.tsx')).default.render;
            }

            if (isProd) {
                template = indexProd;

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                render = (await import('../entry/entry-server.js')).default.render;
            }

            const context: any = {};
            const appHtml = await render(req)
            const { helmet } = appHtml;

            if (context.url) return res.redirect(301, context.url);

            let html = template.replace('<!--app-html-->', appHtml.html)

            const helmetData = `
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${helmet.link.toString()}
                ${helmet.style.toString()}
            `

            html = html.replace('<!--app-head-->', helmetData)
            html = html.replace('<!--app-scripts-->', helmet.script.toString())

            res.status(200).set({ "Content-Type": "text/html" }).end(html)

        } catch (e: any) {
            !isProd && vite.ssrFixStacktrace(e)
            res.status(500).end(e.stack)
        }
    })

    return { app, httpsServer, vite }
}

if (!isTest) {
    createServer().then(({ app, httpsServer }) => {
        httpsServer.listen(443, () => {
            console.log('HTTPS server listening on port 443');
        });
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on https://localhost:${process.env.PORT || 3000}`);
        });
    })
}