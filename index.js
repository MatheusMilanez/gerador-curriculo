// CEP

async function buscaCep(cep) {
  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      alert("CEP NÃO ENCONTRADO");
      return;
    }

    document.getElementById("rua").value = dados.logradouro;
    document.getElementById("bairro").value = dados.bairro;
    document.getElementById("cidade").value = dados.localidade;
    document.getElementById("uf").value = dados.uf;
  } catch (error) {
    alert("Erro ao buscar o CEP!");
  }
}

//Evento CEP

document.getElementById("cep").addEventListener("blur", () => {
  const cep = this.value.replace(/\D/g, "");
  if (cep.length === 8) {
    buscaCep(cep);
  }
});

//--------------------------------------------

//-- Pegar Dados Formulário

// Dados Pessoais

function buscaDados(value) {
  console.log("HERE", value);
}

buscaDados();
//--------------------------------------------

//Download PDF

document.getElementById("download").addEventListener("click", () => {
  if (window.jspdf) {
    const { jsPDF } = window.jspdf; // Aqui é onde acessamos a classe jsPDF
    const doc = new jsPDF();
    doc.text("Olá, Mundo!", 10, 10);
    doc.save("documento.pdf");
  } else {
    console.log("JSPDF não está disponivel");
  }
});

//---------------------
