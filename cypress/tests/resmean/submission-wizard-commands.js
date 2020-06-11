Cypress.Commands.add('getSubmissionWizardStepSubmitButton', (step) => {
	cy.get('form[id^=submitStep' + step + 'Form] button[id^=submitFormButton-]');
});

