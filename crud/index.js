var restify = require("restify");

var arrDolly = [];

function insertDolly(req, res, next){
	var dolly = {
		id: arrDolly.length,
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	}
	
	if ( dolly && dolly != null ) {
		arrDolly.push(dolly);
		res.send(201, dolly);
	} else
		res.send(400, "Erro");
	
    next();
}


function updateDolly(req, res, next){
	var dolly = {
		id: req.body.id,
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	}
	
	if (dolly && dolly != null){
		arrDolly[dolly.id] = dolly;
		res.send(201, arrDolly[dolly.id]);
	} else {
		res.send(400, "Erro");
	}
	
    next();
}


function getDolly(req, res, next) {
	var dolly = {
		id: req.query.id
	}

	if (dolly && dolly != null){
		res.send(201, arrDolly[dolly.id])
	} else {
		res.send(400, "Erro");
	}

	next();
}


function deleteDolly(req, res, next){
	var dolly = {
		id: req.query.id
	}
	
	if (dolly && dolly != null){
		arrDolly[dolly.id] = [];
		res.send(201, arrDolly[dolly.id]);
	} else {
		res.send(400, "Erro");
	}
	
    next();
}


var server = restify.createServer({
    name: 'Dollynho'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.post("/save", insertDolly);
server.get("/get", getDolly);
server.put("/update", updateDolly);
server.del("/delete", deleteDolly);

var port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log("%s rodando", server.name);
});