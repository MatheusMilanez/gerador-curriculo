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
var foto = document.getElementById("formFile");
var nome = document.getElementById("nome");
var cep = document.getElementById("cep");
var rua = document.getElementById("rua");
var bairro = document.getElementById("bairro");
var cidade = document.getElementById("cidade");
var uf = document.getElementById("uf");
var telefone = document.getElementById("telefone");
var email = document.getElementById("email");

//Formação academica
var nomeEscola = document.getElementById("nomeEscola");
var nivel = document.getElementById("nivel");
var dataConclusao = document.getElementById("dataConclusao");

//Formação Profissional
var nomeEmpresa = document.getElementById("nomeEmpresa");
var cargo = document.getElementById("cargo");
var periodo = document.getElementById("periodo");
var principalAtividade = document.getElementById("principalAtividade");

//--------------------------------------------

//Download PDF
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  if (window.jspdf) {
    try {
      const resume = document.getElementById("curriculo");
      const canvas = await html2canvas(resume);
      const imgData = canvas.toDataURL("image/png");

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      doc.save("resume.pdf");
    } catch (erro) {
      console.error("ERROR:", erro);
    }
  } else {
    console.log("BIBLIOTECA JSPDF NÃO ACESSADA");
  }
}

//---------------------
