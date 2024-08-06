// script.js
document.addEventListener('DOMContentLoaded', function() {
    let workExperienceCount = 1;
    let educationCount = 1;

    // Function to validate date format (DD/MM/YYYY)
    function isValidDate(dateString) {
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/; // Matches DD/MM/YYYY
        if (!regex.test(dateString)) return false;

        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    }

    // Function to handle form submission and PDF generation
    document.getElementById("cvForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate dates
        const birthdate = document.getElementById("birthdate").value;
        const graduationDate = document.getElementById("graduation-date-0").value;
        const startDate = document.getElementById("start-date-0").value;
        const endDate = document.getElementById("end-date-0").value;

        if (!isValidDate(birthdate)) {
            alert("Por favor, insira uma data de nascimento válida no formato DD/MM/YYYY.");
            return;
        }
        if (!isValidDate(graduationDate)) {
            alert("Por favor, insira uma data de conclusão válida no formato DD/MM/YYYY.");
            return;
        }
        if (!isValidDate(startDate)) {
            alert("Por favor, insira uma data de início válida no formato DD/MM/YYYY.");
            return;
        }
        if (endDate && !isValidDate(endDate)) {
            alert("Por favor, insira uma data de término válida no formato DD/MM/YYYY.");
            return;
        }

        // Proceed with PDF generation if all dates are valid
        const { jsPDF } = window.jspdf; // Access jsPDF
        const doc = new jsPDF();

        // Collecting data and generating PDF...
    });
    
    // Event listeners for completion question
    document.getElementById('completed-yes').addEventListener('click', function() {
        document.getElementById('graduation-date-container').style.display = 'block'; // Show graduation date input
    });

    document.getElementById('completed-no').addEventListener('click', function() {
        document.getElementById('graduation-date-container').style.display = 'none'; // Hide graduation date input
        const educationLevel = document.getElementById('level-0').value; // Get the course name
        const educationContainer = document.getElementById('education-container');

        // Automatically add "Em andamento" to the CV
        const ongoingText = document.createElement('p');
        ongoingText.textContent = `${educationLevel}: Em andamento`;
        educationContainer.appendChild(ongoingText);
    });

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

            <label for="start-date-${workExperienceCount}">Data de Início:</label>
            <input type="text" id="start-date-${workExperienceCount}" name="start-date[]" placeholder="DD/MM/YYYY" required>

            <div id="current-question-${workExperienceCount}" style="margin: 10px 0;">
                <span>Atual?</span>
                <button type="button" id="current-yes-${workExperienceCount}">Sim</button>
                <button type="button" id="current-no-${workExperienceCount}">Não</button>
            </div>

            <div id="end-date-container-${workExperienceCount}" style="display: none;">
                <label for="end-date-${workExperienceCount}">Data de Término:</label>
                <input type="text" id="end-date-${workExperienceCount}" name="end-date[]">
            </div>

            <label for="activity-${workExperienceCount}">Principal Atividade:</label>
            <textarea id="activity-${workExperienceCount}" name="activity[]" required></textarea>
        `;

        container.appendChild(newExperience);
        workExperienceCount++;

        // Add event listeners for the new experience
        addCurrentQuestionListeners(workExperienceCount - 1);
    });

    // Function to add event listeners for current question buttons
    function addCurrentQuestionListeners(index) {
        document.getElementById(`current-yes-${index}`).addEventListener('click', function() {
            const startDate = document.getElementById(`start-date-${index}`).value;
            const ongoingText = document.createElement('p');
            ongoingText.textContent = `Data de Início: ${startDate} - Atualmente`;
            document.getElementById('work-experience-container').appendChild(ongoingText);
        });

        document.getElementById(`current-no-${index}`).addEventListener('click', function() {
            document.getElementById(`end-date-container-${index}`).style.display = 'block'; // Show end date input
        });
    }

    // Function to add more educational entries
    document.getElementById('add-education').addEventListener('click', function() {
        const container = document.getElementById('education-container');

        const newEducation = document.createElement('div');
        newEducation.classList.add('education-entry');

        newEducation.innerHTML = `
            <label for="education-${educationCount}">Nome da escola/universidade:</label>
            <input type="text" id="education-${educationCount}" name="education[]" required>

            <label for="level-${educationCount}">Curso:</label>
            <input type="text" id="course-${educationCount}" name="course[]" required>

            <label for="nivel-${educationCount}">Nível:</label>
            <input type="text" id="nivel-${educationCount}" name="nivel[]" required>

            <div id="completion-question" style="margin: 10px 0;">
                <span>Concluído?</span>
                <button type="button" id="completed-yes">Sim</button>
                <button type="button" id="completed-no">Não</button>
            </div>

            <div id="graduation-date-container" style="display: none;">
                <label for="graduation-date-${educationCount}">Data da conclusão:</label>
                <input type="date" id="graduation-date-${educationCount}" name="graduation-date[]" required>
            </div>
        `;

        container.appendChild(newEducation);
        educationCount++;
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
});
