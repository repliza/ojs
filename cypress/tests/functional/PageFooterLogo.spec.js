describe('Page footer logo customization tests', function() {
	it('Frontend', function() {
		cy.visit('/');

		cy.get('[data-cy=page-footer-logo-img]');
	});

	it('Dashboard', function() {
		let user = Cypress.env('ADMIN_USER');
		cy.login(user, Cypress.env('ADMIN_PASSWORD'));

		// forcing click otherwise Cypress will complain about a display: none because it does not seem to understand media queries
		cy.get('a').contains(user).click({force: true});
		cy.get('a').contains('Dashboard').click({force: true});

		cy.get('[data-cy=page-footer-logo-img]');
	});

	/*
	it('Review, Get all submission details', function() {
		cy.visit('/');

		cy.get('[data-cy=page-footer-logo-img]');
	});
	*/
});

