document.addEventListener('DOMContentLoaded', function() {
    let workExperienceCount = 1;
    let educationCount = 1;

    // Function to handle completion question clicks
    document.getElementById('education-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('completed-yes')) {
            event.target.closest('.education-entry').querySelector('.graduation-date-container').style.display = 'block';
        } else if (event.target.classList.contains('completed-no')) {
            event.target.closest('.education-entry').querySelector('.graduation-date-container').style.display = 'none';
            const educationLevel = event.target.closest('.education-entry').querySelector(`input[name="level[]"]`).value;
            const ongoingText = document.createElement('p');
            ongoingText.textContent = `${educationLevel}: Em andamento`;
            event.target.closest('.education-entry').appendChild(ongoingText);
        }
    });

    // Function to add more education entries
    document.getElementById('add-education').addEventListener('click', function() {
        const container = document.getElementById('education-container');
        const newEducation = document.createElement('div');
        newEducation.classList.add('education-entry');
        newEducation.innerHTML = `
            <label for="education-${educationCount}">Nome da escola/universidade:</label>
            <input type="text" id="education-${educationCount}" name="education[]" required>

            <label for="level-${educationCount}">Curso:</label>
            <input type="text" id="level-${educationCount}" name="level[]" required>

            <label for="nivel-${educationCount}">Nível:</label>
            <input type="text" id="nivel-${educationCount}" name="nivel[]" required>

            <div class="completion-question" style="margin: 10px 0;">
                <span>Concluído?</span>
                <button type="button" class="completed-yes">Sim</button>
                <button type="button" class="completed-no">Não</button>
            </div>

            <div class="graduation-date-container" style="display: none;">
                <label for="graduation-date-${educationCount}">Data da conclusão:</label>
                <input type="date" id="graduation-date-${educationCount}" name="graduation-date[]" required>
            </div>
        `;
        container.appendChild(newEducation);
        educationCount++;
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

            <div class="current-question" style="margin: 10px 0;">
                <span>Atual?</span>
                <button type="button" class="current-yes">Sim</button>
                <button type="button" class="current-no">Não</button>
            </div>

            <div class="end-date-container" style="display: none;">
                <label for="end-date-${workExperienceCount}">Data de Término:</label>
                <input type="text" id="end-date-${workExperienceCount}" name="end-date[]">
            </div>

            <label for="activity-${workExperienceCount}">Principal Atividade:</label>
            <textarea id="activity-${workExperienceCount}" name="activity[]" required></textarea>
        `;
        container.appendChild(newExperience);
        workExperienceCount++;
    });

    // Function to update the CV preview
    function updateCVPreview() {
        const name = document.getElementById("name").value;
        const birthdate = document.getElementById("birthdate").value;
        const gender = document.getElementById("gender").value;
        const cep = document.getElementById("cep").value;
        const street = document.getElementById("street").value;
        const number = document.getElementById("number").value;
        const neighborhood = document.getElementById("neighborhood").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;

        let previewContent = `
            <h3>${name}</h3>
            <p>Data de Nascimento: ${birthdate}</p>
            <p>Gênero: ${gender}</p>
            <p>Endereço: ${street}, ${number} - ${neighborhood}, ${city} - ${state}, CEP: ${cep}</p>
            <p>Telefone: ${phone}</p>
            <p>E-mail: ${email}</p>
        `;

        // Append education entries
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach((entry, index) => {
            const school = entry.querySelector(`input[name="education[]"]`).value;
            const course = entry.querySelector(`input[name="level[]"]`).value;
            const level = entry.querySelector(`input[name="nivel[]"]`).value;
            previewContent += `<p>Educação ${index + 1}: ${school}, ${course} (${level})</p>`;
        });

        // Append work experience entries
        const workEntries = document.querySelectorAll('.work-experience');
        workEntries.forEach((entry, index) => {
            const company = entry.querySelector(`input[name="company[]"]`).value;
            const position = entry.querySelector(`input[name="position[]"]`).value;
            previewContent += `<p>Experiência ${index + 1}: ${company} - ${position}</p>`;
        });

        document.getElementById("preview-content").innerHTML = previewContent;
        document.getElementById("cv-preview").style.display = 'block';
    }

    // Event listener for the preview button
    document.getElementById("preview-button").addEventListener("click", updateCVPreview);

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
        const graduationDate = document.getElementById("graduation-date-0")?.value;
        const startDate = document.getElementById("start-date-0").value;
        const endDate = document.getElementById("end-date-0")?.value;

        if (!isValidDate(birthdate)) {
            alert("Por favor, insira uma data de nascimento válida no formato DD/MM/YYYY.");
            return;
        }
        if (graduationDate && !isValidDate(graduationDate)) {
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
});
