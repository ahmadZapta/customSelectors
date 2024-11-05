document.addEventListener("DOMContentLoaded", () => {
    const singleSelector = document.querySelectorAll(".data-selector-wrapper");
    console.log(singleSelector);

    singleSelector.forEach(wrapper => {
        const budgetInput = wrapper.querySelector(".selector-input-field");
        const budgetMenu = wrapper.querySelector(".custom-selector-menu");
        const budgetOptions = budgetMenu.querySelectorAll('input[type="radio"]');

        budgetInput.addEventListener("click", (e) => {
            e.stopPropagation();
            budgetMenu.classList.toggle("d-none");
            budgetMenu.classList.toggle("d-flex");
        });

        budgetOptions.forEach(option => {
            option.addEventListener("change", () => {
                budgetInput.value = option.value;
                budgetMenu.classList.add("d-none");
                budgetMenu.classList.remove("d-flex");
            });
        });

        document.addEventListener("click", (e) => {
            if (!wrapper.contains(e.target)) {
                budgetMenu.classList.add("d-none");
                budgetMenu.classList.remove("d-flex");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    const multiSelectorWrappers = document.querySelectorAll(".multi-selector-wrapper");
    multiSelectorWrappers.forEach(multiSelectorWrapper => {
        const servicesInput = multiSelectorWrapper.querySelector(".selector-input-field");
        const serviceMenu = multiSelectorWrapper.querySelector(".custom-selector-menu");
        const checkboxes = serviceMenu.querySelectorAll('input[type="checkbox"]');
        const selectedServices = [];

        servicesInput.addEventListener("click", (e) => {
            e.stopPropagation();
            serviceMenu.classList.toggle("d-none");
            serviceMenu.classList.toggle("d-flex");
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                updateSelectedServices(checkbox);
                updateServicesField();
            });
        });

        document.addEventListener("click", (e) => {
            if (!serviceMenu.contains(e.target) && e.target !== servicesInput) {
                serviceMenu.classList.add("d-none");
                serviceMenu.classList.remove("d-flex");
            }
        });

        function updateSelectedServices(checkbox) {
            if (checkbox.checked) {
                if (!selectedServices.includes(checkbox.value)) {
                    selectedServices.push(checkbox.value);
                    const hiddenInput = document.createElement('input');
                    hiddenInput.type = 'hidden';
                    hiddenInput.name = 'services[]';
                    hiddenInput.value = checkbox.value;
                    hiddenInput.id = `hidden_${checkbox.value}`;
                    contactForm.appendChild(hiddenInput);
                }
            } else {
                const index = selectedServices.indexOf(checkbox.value);
                if (index > -1) {
                    selectedServices.splice(index, 1);

                    const hiddenInput = document.getElementById(`hidden_${checkbox.value}`);
                    if (hiddenInput) {
                        contactForm.removeChild(hiddenInput);
                    }
                }
            }
            console.log(selectedServices);
        }

        function updateServicesField() {
            const checkedItems = Array.from(checkboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            if (checkedItems.length === 1) {
                servicesInput.value = checkedItems[0];
            } else if (checkedItems.length > 1) {
                servicesInput.value = `${checkedItems[0]}, +${checkedItems.length - 1}`;
            } else {
                servicesInput.value = "";
            }
        }
    });
});