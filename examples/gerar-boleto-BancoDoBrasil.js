const { Bancos, Boletos, streamToPromise } = require('../lib/index');

const boleto = {
  banco: new Bancos.BancoBrasil(),
  pagador: {
    nome: 'LIDER INDUSTRIA E COMERCIO DE TELAS',
    registroNacional: '',
    endereco: {
      logradouro: 'RODOVIA GO070, s/n',
      bairro: 'Chacaras Helou',
      cidade: 'Goiania',
      estadoUF: 'GO',
      cep: '74470450'
    }
  },
  
  beneficiario: {
    nome: 'INCOTELA INDUSTRIA E COMERCIO LTDA CNPJ 466.086.369/0001-60',
    cnpj:'',
    dadosBancarios: {
      carteira: '17/019',
      agencia: '2857',
      agenciaDigito: '6',
      conta: '00100687',
      contaDigito: '8',
      nossoNumero: '30888520000000015',
      nossoNumeroDigito: '0'
    },
    endereco: {
      logradouro: 'Estr. Luiz Fernando Rodriguez, 2053',
      bairro: 'Vila Boa Vista',
      cidade: 'Campinas',
      estadoUF: 'SP',
      cep: '13064-798'
    }
  },
  boleto: {
    numeroDocumento: '1/14635/1',
    especieDocumento: 'DM',
    valor: 0.01,
    datas: {
      vencimento: '06-12-2019',
      processamento: '12-20-2021',
      documentos: '05-15-2019'
    }
  }
};

const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile().then(async ({ stream }) => {
  // ctx.res.set('Content-type', 'application/pdf');	
  await streamToPromise(stream);
}).catch((error) => {
  return error;
});



