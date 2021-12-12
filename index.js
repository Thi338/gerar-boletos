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

		return [filePath, fileName].join('/');
	} catch (error) {
		console.error(error)
	}
};


