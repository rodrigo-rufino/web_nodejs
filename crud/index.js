var restify = require("restify");

var arrToddy = [];

function insertDolly(req, res, next){
	var toddy = {
		id: req.body.id,
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	}
	
	if ( dolly && dolly != null )
		res.status(201).send(dolly);
	else
		res.status(400).send("Erro");
	
    next();
}

var server = restify.createServer({
    name: 'Dollynho'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.get("/save", insertDolly);

var port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log("%s rodando", server.name);
});