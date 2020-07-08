Cypress.Commands.add('navigateFromHomepageToDashboard', (userName) => {
	// forcing click otherwise Cypress will complain about a display: none because it does not seem to understand media queries
	cy.get('a').contains(userName).click({force: true});
	cy.get('a').contains('Dashboard').click({force: true});
});

Cypress.Commands.add('startSubmissionFromDashboard', (sectionTitle) => {
	cy.get('.pkp_nav_add_submission').first().within(() => {
		cy.get('button').focus().next().find('a').contains(sectionTitle).click({force: true});
	});
});