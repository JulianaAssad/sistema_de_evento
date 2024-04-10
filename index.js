let participantes = [
  {
    nome: "Juliana Santos",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro.almeida@example.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Ana Oliveira",
    email: "ana.oliveira@example.com",
    dataInscricao: new Date(2024, 0, 3, 19, 23),
    dataCheckIn: new Date(2024, 0, 4, 20, 20)
  },
  {
    nome: "João Pereira",
    email: "joao.pereira@example.com",
    dataInscricao: new Date(2023, 11, 4, 19, 23),
    dataCheckIn: new Date(2023, 11, 5, 20, 20)
  },
  {
    nome: "Maria Silva",
    email: "maria.silva@example.com",
    dataInscricao: new Date(2023, 10, 5, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Carlos Santos",
    email: "carlos.santos@example.com",
    dataInscricao: new Date(2023, 9, 6, 19, 23),
    dataCheckIn: new Date(2023, 9, 7, 20, 20)
  },
  {
    nome: "Mariana Lima",
    email: "mariana.lima@example.com",
    dataInscricao: new Date(2023, 8, 7, 19, 23),
    dataCheckIn: new Date(2023, 8, 8, 20, 20)
  },
  {
    nome: "Lucas Costa",
    email: "lucas.costa@example.com",
    dataInscricao: new Date(2023, 7, 8, 19, 23),
    dataCheckIn: new Date(2023, 7, 9, 20, 20)
  },
  {
    nome: "Patrícia Fernandes",
    email: "patricia.fernandes@example.com",
    dataInscricao: new Date(2023, 6, 9, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Gustavo Pereira",
    email: "gustavo.pereira@example.com",
    dataInscricao: new Date(2023, 5, 10, 19, 23),
    dataCheckIn: null
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}