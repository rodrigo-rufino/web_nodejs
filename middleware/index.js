var restify = require("restify");
var dao = require("./dao");
var corsMiddleware = require("restify-cors-middleware");

const cors = corsMiddleware({
	origins: ["*"],
	allowHeaders: ["API-Token"],
	exposeHeaders: ["API-Token-Expiry"]
});

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

	dao.updateToddy(toddy)
		.then( (daoRes) => {
			res.json(daoRes);
		})
		.catch( (daoRes) => {
			res.json(daoRes);
		});
	
    next();
}


function getToddy(req, res, next) {

	console.log("Get Toddy.")
	
	dao.getToddy()
		.then( (daoRes) => {
			res.json(daoRes);
		})
		.catch( (daoRes) => {
			res.json(daoRes);
		});

    next();
}

function getToddyExpirationDate(req, res, next) {

	console.log("Get Toddy Expiration Date.");

	dao.getToddyExpirationDate()
		.then( (daoRes) => {
			res.json(daoRes);
		})
		.catch( (daoRes) => {
			res.json(daoRes);
		});
	
    next();
}


function getToddyId(req, res, next) {

	console.log("Get Toddy Id.")

	var toddy = {
		id: req.query.id
	}

	dao.getToddyId(toddy)
		.then( (daoRes) => {
			res.json(daoRes);
		})
		.catch( (daoRes) => {
			res.json(daoRes);
		});

    next();
}


function deleteToddy(req, res, next){
	console.log("Delete Toddy.")

	var toddy = req.query.id;

	dao.deleteToddy(toddy)
		.then( (daoRes) => {
			res.json(daoRes);
		})
		.catch( (daoRes) => {
			res.json(daoRes);
		});
	
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

server.pre(cors.preflight);
server.use(cors.actual);

server.post("/toddy/save", insertToddy);
server.get("/toddy/get", getToddy);
server.get("/toddy/getExpiration", getToddyExpirationDate)
server.get("/toddy/getId", getToddyId);
server.put("/toddy/update", updateToddy);
server.del("/toddy/delete", deleteToddy);

var port = process.env.PORT || 5000;

server.listen(port, function() {
	console.log("%s rodando", server.name);
	//console.log(server);
});