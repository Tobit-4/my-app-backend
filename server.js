const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use((req, res, next) => {
    const allowedOrigins = [
        'https://Tobit-4.github.io',
        'http://localhost:3000'      
    ];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

server.use('/api', router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});