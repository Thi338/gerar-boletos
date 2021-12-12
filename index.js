"use strict";

// A linha a seguir é necessária para que as funções 'exportadas' neste script
// possam ficar disponíveis no Syracuse node.js
exports.$exported = true;


/**
 * @param {import('fs').PathOrFileDescriptor} path
 * @returns module
 */
function cacheRequire(path) {
	delete require.cache[require.resolve(path)];
	return require(path);
}

/**
 * @returns {import('./x3-csv.js')}
 */
function requireBoletoModules() {
	var libBoletos = cacheRequire('./lib/index');
	return libBoletos;
}

function logFileName() {
	var date = new Date();
	var month = `${date.getMonth() + 1}`;
	var day = `${date.getDate()}`;
	var mm = `${date.getMinutes()}`
	var ss = `${date.getSeconds()}`
	//return `${date.getFullYear()}-${month.padStart(2, '0')}-${day.padStart(2, '0')}_${mm.padStart(2, '0')}-${ss.padStart(2, '0')}.log`
	return 
}

function writeLog(append) {
	var date = new Date();
	var month = `${date.getMonth() + 1}`;
	var day = `${date.getDate()}`;
	var mm = `${date.getMinutes()}`
	var ss = `${date.getSeconds()}`
	var fileName = `${date.getFullYear()}-${month.padStart(2, '0')}-${day.padStart(2, '0')}.log`

	var fs = require('fs');
	var filePath = require("path").resolve(__dirname, 'log',fileName)
	fs.appendFileSync(filePath, `\n${date.getFullYear()}${month.padStart(2, '0')}${day.padStart(2, '0')}_${mm.padStart(2, '0')}:${ss.padStart(2, '0')}: ${append}`)

}
/**
 * Convert json to x3csv (SYNC)
 * @param {*} _ usually the callback
 * @param {string} boletoJSON clob
 * @returns {string} string clob
 */
exports.gerar_boleto = async function (_, boletoJSON) {
	try {
		var { Bancos, Boletos, StreamToPromise } = requireBoletoModules();
		var callback = typeof _ == 'function' ? _ : function (err) {
			console.error({ clobJSON, err })
			throw err
		}
		var boleto = JSON.parse(boletoJSON)
		var banco = new Bancos[boleto.banco]();
		boleto.boletoInfo.banco = banco
		var novoBoleto = new Boletos(boleto.boletoInfo);
		novoBoleto.gerarBoleto();
		var filePath = boleto.pdfPath
		var docX3 = boleto.numdud.split('/')
		var { linha } = await novoBoleto.boletoInfo.getLinhaDigitavelFormatado()
		var linhaSemFormatacao = linha.replace(/\s|\./gmi, '');
		var fileName = `Boleto ${docX3[0]}-${docX3[1].padStart(3, '0')} ${linhaSemFormatacao}.pdf`
		await novoBoleto.pdfFile(filePath, fileName);

		var result = [filePath, fileName].join('/');
		writeLog('Boleto Gerado: ' + result)

		return result
	} catch (error) {
		writeLog(JSON.stringify(error))
		console.error(error)
	}
};


