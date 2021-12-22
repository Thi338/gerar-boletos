const { Bancos, Boletos, streamToPromise } = require('../lib/index');
const boleto = {
  banco: new Bancos.Santander(),
  pagador: {
    nome: 'LEFOSSE ADVOGADOS',
    registroNacional: '57756694000109',
    endereco: {
      logradouro: 'RUA IGUATEMI- ANDAR 11 12 13 14 22 , CONJ 82 DO 8 ANDAR, 151',
      bairro: 'ITAIM BIBI',
      cidade: 'São Paulo',
      estadoUF: 'SP',
      cep: '01001000'
    }
  },
  instrucoes: ['SUJEITO A PROTESTO APÓS VENCIMENTO.'],
  beneficiario: {
    dadosBancarios: {
        carteira: '0101',
        agencia: '3644',
        agenciaDigito: '9',
        conta: '734407',
        contaDigito: '4',
        nossoNumero: '000000000129',
        nossoNumeroDigito: '5'
      },
    endereco: {
        logradouro: 'R. Gustavo Ambrust, 464',
        bairro: 'Nova Campinas',
        cidade: 'Campinas',
        estadoUF: 'SP',
        cep: '13092-106'
    },
    cnpj: '19837246000140',
    nome: 'GRI BRAZIL EVENTOS LTDA'
  },
  boleto: {
    datas: {
        vencimento: '08-01-2021',
        processamento: '12-20-2021',
        documentos: '08-01-2021'
    },
    valor: 79110.08,
    especieDocumento: 'DM',
    numeroDocumento: '1'
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

