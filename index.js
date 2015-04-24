let http = require('http')
let request = require('request')
let through = require('through')
var stream = require('stream');
let fs = require('fs')
let argv = require('yargs')
	.usage('Usage: $0 [options]')
	.example('$0 --url=http://www.google.com --logfilepath=/tmp/proxyserver.log', 'Proxy the request to google.com and send all the logs to /tmp/proxyserver.log')
	.example('$0 --host=localhost --port=8000 --logfilepath=/tmp/proxyserver.log', 'Proxy the request to http://localhost:8000 and send all the logs to /tmp/proxyserver.log')
	.describe('host', 'Host name of the server to proxy')
	.describe('port', 'Port of the server to proxy. The default is 80')
	.describe('url', 'Provide the complete the URL of the server with port. host and port parameter will be ignored if url is passed')
	.describe('logfilepath', 'The log file path of the proxy server')
	.describe('loglevel', 'Log Level. Supported logging levels - emerg | alert | crit | error | warn | notice | info | debug')
	.help('h')
    .alias('h', 'help')
    .epilog('Copyright 2015 - CodePath and Walmart Labs')
	.default('host', '127.0.0.1')
	.default('loglevel', 'info')
	.argv
let scheme = 'http://'
let port = argv.port || argv.host === '127.0.0.1' ?
	8000 : 80
let destinationUrl = argv.url || scheme + argv.host + ':' + port
let logStream = argv.logfilepath ? fs.createWriteStream(argv.logfilepath) 
	: process.stdout
let loglevels = {
		emerg: 0,
		alert: 1,
		crit: 2,
		error: 3,
		warn: 4,
		notice: 5,
		info: 6,
		debug: 7
}
http.createServer((req, res) => {
	logInfo('\n Echo Request: \n' + JSON.stringify(req.headers))
	for (let header in req.headers) {
		res.setHeader(header, req.headers[header])
	}
	
	logDebug(req)
	req.pipe(res)
}).listen(8000)

log('debug','LListening at http://127.0.0.1:8000')

http.createServer((req, res) => {
	logDebug(req.url)
	logDebug(destinationUrl)
	let url = destinationUrl
	if(req.headers['x-destination-url']){
		url = req.headers['x-destination-url']
	}
	logInfo('url' + url)
	let options = {
		headers: req.headers,
		url: url + req.url
	}
	
	logInfo('\n Proxy Request: \n' + JSON.stringify(req.headers))
	logDebug(req)
	
	let destinationResponse = req.pipe(request(options))
	
	logDebug(JSON.stringify(destinationResponse.headers))
	destinationResponse.pipe(res)
	logDebug(destinationResponse)
	
}).listen(8001)
log('debug','Listening at http://127.0.0.1:8001')

function logEmerg(content) {
	log('emerg', content)
}

function logAlert(content) {
	log('alert', content)
}

function logCritical(content) {
	log('crit', content)
}
function logError(content) {
	log('error', content)
}

function logWarn(content) {
	log('warn', content)
}

function logNotice(content) {
	log('notice', content)
}

function logInfo(content) {
	log('info', content)
}

function logDebug(content) {
	log('debug', content)
}

function log(level, content) {
	if(loglevels[level] <= loglevels[argv.loglevel]){
	    if (content instanceof stream.Stream) {
    		through(content, logStream, {autoDestroy: false})
    	} else {
    		logStream.write ('[' + level + ']' + content)
    	}
    }
}
