
module.exports = {
	ISOdatetime: ISOdatetime,
	log: log
}

function ISOdatetime(date) {
	date = date || new Date();
	return date.toISOString(); 
}

var loghandle = null;
function clearhandle() {
	clearTimeout(loghandle);
	loghandle = null;
}
function log() {
	console.log(ISOdatetime(), ...arguments);

	if (loghandle) {	
		clearhandle();
	}
	loghandle = setTimeout( ()=> {
		log("--- 4s");
		clearhandle();
	}, 4000);
}


