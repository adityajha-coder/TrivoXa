const http = require('http');
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        if(body) console.log("BROWSER ERROR REPORT:\n", body);
        res.end('ok');
    });
}).listen(4444, () => console.log('Listening on 4444...'));
