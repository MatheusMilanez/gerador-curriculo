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

// Function to fetch address details based on CEP
async function buscaCep(cep) {
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP NÃO ENCONTRADO");
            return;
        }

        // Populate the address fields with the fetched data
        document.getElementById("street").value = dados.logradouro;
        document.getElementById("neighborhood").value = dados.bairro;
        document.getElementById("city").value = dados.localidade;
        document.getElementById("state").value = dados.uf;
    } catch (error) {
        alert("Erro ao buscar o CEP!");
    }
}

// Event listener for CEP input field
document.getElementById("cep").addEventListener("blur", function() {
    const cep = this.value.replace(/\D/g, ""); // Remove non-digit characters
    if (cep.length === 8) {
        buscaCep(cep);
    } else {
        alert("Por favor, insira um CEP válido com 8 dígitos.");
    }
});

// Event listener for PCD button
document.getElementById("pcd-button").addEventListener("click", function() {
    const disabilityContainer = document.getElementById("disability-container");
    if (disabilityContainer.style.display === "none") {
        disabilityContainer.style.display = "block"; // Show the disability input
    } else {
        disabilityContainer.style.display = "none"; // Hide the disability input
    }
});

// Function to handle form submission and PDF generation
document.getElementById("cvForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const zipCode = document.getElementById("cep").value;

    // Validate the zip code format
    if (!validateZipCode(zipCode)) {
        alert('Por favor, insira um CEP válido no formato XXXXX-XXX.');
        return;
    }

    const { jsPDF } = window.jspdf; // Access jsPDF
    const doc = new jsPDF();

    // Collecting data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const educationEntries = document.getElementsByName("education[]");
    const workEntries = document.getElementsByName("company[]");

    // Adding personal information to PDF
    doc.text(`Nome: ${name}`, 10, 10);
    doc.text(`E-mail: ${email}`, 10, 20);
    doc.text(`Telefone: ${phone}`, 10, 30);
    doc.text(`CEP: ${zipCode}`, 10, 40);

    // Adding education information
    doc.text('Formação Acadêmica:', 10, 50);
    for (let i = 0; i < educationEntries.length; i++) {
        doc.text(`- ${educationEntries[i].value}`, 10, 60 + (i * 10));
    }

    // Adding work experience information
    doc.text('Experiência Profissional:', 10, 60 + (educationEntries.length * 10) + 10);
    for (let i = 0; i < workEntries.length; i++) {
        doc.text(`- ${workEntries[i].value}`, 10, 70 + (educationEntries.length * 10) + (i * 10));
    }

    // Save the PDF
    doc.save('curriculo.pdf');
});

// Zip code validation function
function validateZipCode(zipCode) {
    const zipCodePattern = /^\d{5}-\d{3}$/; // Valid format: XXXXX-XXX
    return zipCodePattern.test(zipCode);
}
