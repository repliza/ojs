Cypress.Commands.add('withinCustomForm', (title, callbackFn) => {
	cy.contains('.pkp_controllers_grid > .header > h4', title).closest('.pkp_controllers_grid').within(callbackFn);
});

Cypress.Commands.add('getCustomFormInput', (label) => {
	cy.contains('.section > label', label).parent().find('input[type=text]');
});

Cypress.Commands.add('getCustomFormTextarea', (label) => {
	cy.contains('.section > label', label).parent().find('textarea');
});

