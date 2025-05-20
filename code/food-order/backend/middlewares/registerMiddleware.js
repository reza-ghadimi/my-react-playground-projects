import express from 'express';
import bodyParser from 'body-parser';

export function registerMiddleware(app) {
    app.use(bodyParser.json());
    app.use(express.static('public'));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS, POST, DELETE');
        next();
    });
}
