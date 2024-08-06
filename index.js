// script.js
document.addEventListener('DOMContentLoaded', function() {
    let workExperienceCount = 1;
    let educationCount = 1;

    // Function to add more work experiences
    document.getElementById('add-work-experience').addEventListener('click', function() {
        const container = document.getElementById('work-experience-container');

        const newExperience = document.createElement('div');
        newExperience.classList.add('work-experience');

        newExperience.innerHTML = `
            <label for="company-${workExperienceCount}">Nome da empresa:</label>
            <input type="text" id="company-${workExperienceCount}" name="company[]" required>

            <label for="position-${workExperienceCount}">Cargo:</label>
            <input type="text" id="position-${workExperienceCount}" name="position[]" required>

            <label for="period-${workExperienceCount}">Período:</label>
            <input type="text" id="period-${workExperienceCount}" name="period[]" required>

            <label for="activity-${workExperienceCount}">Principal Atividade:</label>
            <textarea id="activity-${workExperienceCount}" name="activity[]" required></textarea>
        `;

        container.appendChild(newExperience);
        workExperienceCount++;
    });

    // Function to add more educational entries
    document.getElementById('add-education').addEventListener('click', function() {
        const container = document.getElementById('education-container');

        const newEducation = document.createElement('div');
        newEducation.classList.add('education-entry');

        newEducation.innerHTML = `
            <label for="education-${educationCount}">Nome da escola/universidade/curso:</label>
            <input type="text" id="education-${educationCount}" name="education[]" required>

            <label for="level-${educationCount}">Nível:</label>
            <input type="text" id="level-${educationCount}" name="level[]" required>

            <label for="graduation-date-${educationCount}">Data da conclusão:</label>
            <input type="date" id="graduation-date-${educationCount}" name="graduation-date[]" required>
        `;

        container.appendChild(newEducation);
        educationCount++;
    });
});

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
