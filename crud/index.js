var restify = require("restify");
var dao = require("./dao");

function insertToddy(req, res, next){
	var toddy = {
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	}

	dao.insertToddy(toddy)
		.then( (daoRes) => {
			res.json(daoRes);
		})
		.catch( (daoRes) => {
			res.json(daoRes);
		});

	next();
}


function updateToddy(req, res, next){

	console.log("Update Toddy.")
	
	var toddy = {
		id: req.body.id,
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	}

	dao.updateToddy(toddy);
	res.json(toddy);
	
    next();
}


function getToddy(req, res, next) {

	console.log("Get Toddy.")
	
	dao.getToddy();

    next();
}

function getToddyExpirationDate(req, res, next) {

	console.log("Get Toddy Expiration Date.");

	dao.getToddyExpirationDate();
	
    next();
}


function getToddyId(req, res, next) {

	console.log("Get Toddy Id.")

	var toddy = {
		id: req.query.id
	}

	dao.getToddyId(toddy);

    next();
}


function deleteToddy(req, res, next){
	console.log("Delete Toddy.")

	var toddy = req.body.id;

	dao.deleteToddy(toddy);
	
    next();
}


var server = restify.createServer({
    name: 'Toddynho'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

function generateLog(req, res, next){
	var date = new Date;
	console.log('[' + date.toISOString() +'] - ' + req.body);
}
//server.use(generateLog)

server.post("/save", insertToddy);
server.get("/get", getToddy);
server.get("/getExpiration", getToddyExpirationDate)
server.get("/getId", getToddyId);
server.put("/update", updateToddy);
server.del("/delete", deleteToddy);

var port = process.env.PORT || 5000;

server.listen(port, function() {
	console.log("%s rodando", server.name);
	//console.log(server);
});