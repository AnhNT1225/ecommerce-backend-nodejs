const app = require('./src/app');

const PORT = process.env.PORT || 3055;

const server = app.listen(3055, () => {
    console.log(`WSV eCommerce start with ${PORT}`);
    });

process.on('SIGNINT', () => {
    server.close(() => {
        console.log('Exit server express');
    });

    //notifiy.send(ping...)
});