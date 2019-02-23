var restify = require("restify");

function hello(req, res, next){
    res.send("Hello world!");
    next();
}

var server = restify.createServer({
    name: 'Pratica 1'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.get("/hello", hello);

var port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log("%s rodando", server.name);
});