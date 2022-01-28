const { Bancos, Boletos, streamToPromise } = require('../lib/index');

const boleto = {
  banco: new Bancos.Bradesco(),
  pagador: {
    nome: 'Gabriel Albejante Pitta',
    RegistroNacional: '',
    endereco: {
      logradouro: 'Praça Floriano Peixoto 9',
      bairro: 'Centro',
      cidade: 'Mogi Mirim',
      estadoUF: 'SP',
      cep: '13800187'
    }
  },
  instrucoes: ['PROTESTAR NO 5º DIA APÓS O VENCIMENTO.', 'JUROS DE 1,5% A.M E MULTA DE 1,5%.'],
  beneficiario: {
    nome: 'INCOTELA INDUTRIA E COMERCIO LTDA CNPJ: 46.086.369/0001-60',
    cnpj: '',
    dadosBancarios: {
      carteira: '09',
      agencia: '2118',
      agenciaDigito: '0',
      conta: '0012486',
      contaDigito: '9',
      nossoNumero: '00000010946',
      nossoNumeroDigito: '3'
    },
    endereco: {
      logradouro: 'Rua Luiz Fernando Rodriguez, 2053',
      bairro: 'Centro',
      cidade: 'Mogi Mirim',
      estadoUF: 'SP',
      cep: '13800-187'
    }
  },
  boleto: {
    numeroDocumento: '1/24675/3',
    especieDocumento: 'DM',
    valor: 1318.80,
    datas: {
      vencimento: '02-15-2022',
      processamento: '12-20-2021',
      documentos: '12-17-2021'
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

