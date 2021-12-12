const assert = require('assert')
const fs = require('fs')
const path = require('path')
delete require.cache[require.resolve('../index')]
const GERA_BOLETO = require('../index')

assert(typeof GERA_BOLETO == 'object',
    "\ntypeof GERA_BOLETO must be  'object'")

assert(typeof GERA_BOLETO.gerar_boleto == 'function',
    "\ntypeof GERA_BOLETO.gerar_boleto must be  'function'")

async function testGeraBoleto(fileName) {
    console.info('\n Test GERA BOLETO')
    let pathString = path.resolve(__dirname, 'x3', fileName)
    await fs.readFile(pathString, "utf8", async function (err, boletoJson) {
        if (err) console.log("err: " + err);
        let result = await GERA_BOLETO.gerar_boleto(function () {
            console.log('test')
        }, boletoJson);
        return result;
    });

}

function testLinhaDigitavel() {
    console.info('\n Test GERA BOLETO')
}

testLinhaDigitavel()

console.log('\nfinished testLinhaDigitavel');
testGeraBoleto('boleto1.json');
testGeraBoleto('boleto2.json');
testGeraBoleto('boleto3.json');
console.log('\nfinished testGeraBoleto');
async function teste(){
    
boletoJson = `{
    "pdfPath": "/boleto", 
    "banco": "Cecred",
    "numdud":"123456/4",
    "boletoInfo": {
        "pagador": {
            "nome": "José Bonifácio de Andrada",
            "RegistroNacional": "12345678",
            "endereco": {
                "logradouro": "Rua Pedro Lessa, 15",
                "bairro": "Centro",
                "cidade": "Rio de Janeiro",
                "estadoUF": "RJ",
                "cep": "20030-030"
            }
        },
        "instrucoes": [
            "Após o vencimento Mora dia R$ 1,59",
            "Após o vencimento, multa de 2%"
        ],
        "beneficiario": {
            "nome": "Empresa Fictícia LTDA",
            "cnpj": "43576788000191",
            "dadosBancarios": {
                "carteira": "09",
                "convenio": "123456",
                "agencia": "0101",
                "agenciaDigito": "5",
                "conta": "03264467",
                "contaDigito": "0",
                "nossoNumero": "00115290000000004",
                "nossoNumeroDigito": "8"
            },
            "endereco": {
                "logradouro": "Rua Pedro Lessa, 15",
                "bairro": "Centro",
                "cidade": "Rio de Janeiro",
                "estadoUF": "RJ",
                "cep": "20030-030"
            }
        },
        "boleto": {
            "numeroDocumento": "1001",
            "especieDocumento": "DM",
            "valor": 110,
            "datas": {
                "vencimento": "02-04-2020",
                "processamento": "02-04-2019",
                "documentos": "02-04-2019"
            }
        }
    }
}`

let test = await GERA_BOLETO.gerar_boleto(function () {
    console.log('test')
}, boletoJson);
console.log(test)
}

teste();

