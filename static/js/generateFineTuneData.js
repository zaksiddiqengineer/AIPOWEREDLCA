export function initializeFineTuneDataSubmission() {
    document.getElementById('fineTuneDataAddition').addEventListener('click', function() {
        // Create a modal container
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');

        // Create the modal content
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // Create the instructions element
        const instructions = document.createElement('p');
        instructions.textContent = 'Please provide the following information to submit your compound LCA data: Enter the chemical you have used in the lab, select an impact value and a factor. Please provide a description for the reasons as to why you have selected the given impact value in the description.';
        instructions.classList.add('instructions');

        // Create the input fields and labels
        const compoundLabel = document.createElement('label');
        compoundLabel.textContent = 'Enter chemical compound:';
        const compoundInput = document.createElement('input');
        compoundInput.type = 'text';

        const impactLabel = document.createElement('label');
        impactLabel.textContent = 'Impact:';
        const impactSelect = document.createElement('select');
        const impactOptions = ['High', 'Medium', 'Low'];
        impactOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.toLowerCase();
            optionElement.textContent = option;
            impactSelect.appendChild(optionElement);
        });

        const factorLabel = document.createElement('label');
        factorLabel.textContent = 'Factor:';
        const factorSelect = document.createElement('select');
        const factorOptions = ['Disposal Methods', 'Extraction', 'Production', 'Green Practices', 'Safety', 'Packaging', 'Labsafety', 'Transporation', 'Quantity'];
        factorOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.toLowerCase();
            optionElement.textContent = option;
            factorSelect.appendChild(optionElement);
        });

        const descriptionLabel = document.createElement('label');
        descriptionLabel.textContent = 'Description:';
        const descriptionTextarea = document.createElement('textarea');

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', function() {
            const compound = compoundInput.value;
            const impact = impactSelect.value;
            const factor = factorSelect.value;
            const description = descriptionTextarea.value;

            const data = {
                instruction: `Are there any long-term environmental effects associated with its ${factor}?`,
                input: '',
                output: `The overall impact score is "${impact}" because ${description}`
            };

            console.log(data); // Replace this with the code to send the data to the backend

            modalContainer.remove();
        });

        // Append the instructions to the modal content
        modalContent.appendChild(instructions);

        // Append the elements to the modal content
        modalContent.appendChild(compoundLabel);
        modalContent.appendChild(compoundInput);
        modalContent.appendChild(impactLabel);
        modalContent.appendChild(impactSelect);
        modalContent.appendChild(factorLabel);
        modalContent.appendChild(factorSelect);
        modalContent.appendChild(descriptionLabel);
        modalContent.appendChild(descriptionTextarea);
        modalContent.appendChild(submitButton);

        // Append the modal content to the modal container
        modalContainer.appendChild(modalContent);

        // Append the modal container to the body
        document.body.appendChild(modalContainer);
    });
}

