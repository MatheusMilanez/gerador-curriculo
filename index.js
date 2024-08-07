const btnGeneratePDF = document.getElementById("generate-pdf");

//-- Pegar Dados Formulário

// Dados Pessoais
const foto = document.getElementById("formFile");
const nome = document.getElementById("nome");

const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");
const telefone = document.getElementById("telefone");
const email = document.getElementById("email");

//Formação academica
const nomeEscola = document.getElementById("nomeEscola");
const nivel = document.getElementById("nivel");
const dataConclusao = document.getElementById("dataConclusao");

//Formação Profissional
const nomeEmpresa = document.getElementById("nomeEmpresa");
const cargo = document.getElementById("cargo");
const periodo = document.getElementById("periodo");
const principalAtividade = document.getElementById("principalAtividade");

//--------------------------------------------

async function buscaCep(cep) {
    // add a placehlold to input
    rua.value = "Buscando...";
    bairro.value = "Buscando...";
    cidade.value = "Buscando...";
    uf.value = "Buscando...";

    // disable the field
    rua.disabled = true;
    bairro.disabled = true;
    cidade.disabled = true;
    uf.disabled = true;

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP NÃO ENCONTRADO");
            return;
        }

        // add the new values to the field
        rua.value = dados.logradouro;
        bairro.value = dados.bairro;
        cidade.value = dados.localidade;
        uf.value = dados.uf;
    } catch (error) {
        // if error enable input and reset values
        rua.value = "";
        bairro.value = "";
        cidade.value = "";
        uf.value = "";

        rua.disabled = false;
        bairro.disabled = false;
        cidade.disabled = false;
        uf.disabled = false;

        alert("Erro ao buscar o CEP!");
    }
}

//Evento CEP

cep.addEventListener("blur", (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
        buscaCep(cep);
    }
});

//--------------------------------------------

//Download PDF
btnGeneratePDF.onclick = generatePDF;

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
