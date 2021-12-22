
const { Bancos, Boletos, streamToPromise } = require('../lib/index')

const boleto = {
    banco: new Bancos.Itau(),
    pagador: {
      nome: 'METALSILO EQUIPAMENTOS AGROINDUSTRI',
      registroNacional: '11264776000135',
      endereco: {
        logradouro: 'Rodovia BR-020',
        bairro: 'Village',
        cidade: 'Formosa',
        estadoUF: 'GO',
        cep: '73814500'
      }

    },

   
    beneficiario: {
      nome: 'INCOTELA INDUSTRIA E COMERCIO LTDA',
      cnpj: '46086369000160',
      dadosBancarios: {
        carteira: '109',
        agencia: '8106',
        agenciaDigito: '5',
        conta: '34686',
        contaDigito: '2',
        nossoNumero: '00002256',
        nossoNumeroDigito: '2',
      },
      endereco: {
        logradouro: '',
        bairro: '',
        cidade: '',
        estadoUF: '',
        cep: ''
      }
    },

    boleto: {
      numeroDocumento: '1/24678/5',
      especieDocumento: 'R$',
      valor: 2264.34,
      datas: {
        vencimento: '02-11-2022',
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
  
