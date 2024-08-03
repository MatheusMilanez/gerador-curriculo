//Download PDF
document.getElementById("Download").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Define o título
  doc.setFontSize(20);
  doc.text("Relatório", 105, 20, null, null, "center");

  // Adiciona uma linha abaixo do título
  doc.setLineWidth(0.5);
  doc.line(10, 25, 200, 25);

  // Adiciona texto com fonte e estilo diferentes
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Seção 1: Introdução", 10, 40);

  // Adiciona um parágrafo de texto
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(
    "Este é um exemplo de parágrafo formatado com jsPDF. Aqui você pode adicionar seu conteúdo.",
    10,
    50
  );

  // Adiciona uma tabela simples
  doc.setFont("helvetica", "bold");
  doc.text("Tabela de Dados:", 10, 70);

  doc.setFont("helvetica", "normal");
  const data = [
    ["Nome", "Idade", "Cidade"],
    ["João", "25", "São Paulo"],
    ["Maria", "30", "Rio de Janeiro"],
    ["Pedro", "28", "Belo Horizonte"],
  ];
  let startY = 80;
  data.forEach((row) => {
    doc.text(row.join("   "), 10, startY);
    startY += 10;
  });

  // Adiciona uma imagem
  const imgData = "data:image/jpeg;base64,...."; // Substitua pela sua imagem Base64
  doc.addImage(imgData, "JPEG", 10, 120, 50, 50);

  // Salva o documento
  doc.save("relatorio.pdf");
});

//---------------------

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

document.getElementById("cep").addEventListener("blur"),
  () => {
    const cep = this.value.replace(/\D/g, "");
    if (cep.length === 8) {
      buscaCep(cep);
    }
  };

//--------------------------------------------
