import '../support/custom-form-commands';
import '../support/dashboard-commands';
import '../support/submission-wizard-commands';

describe('Data suite tests', function() {
	it('Create second submissions of type "Identified Replication (external)"', function() {
		let userName = Cypress.env('ADMIN_USER');
		cy.login(userName, Cypress.env('ADMIN_PASSWORD'));

		cy.navigateFromHomepageToDashboard(userName);
		cy.startSubmissionFromDashboard('Identified Replication (external)');
		cy.finishSubmissionWizardAsIdentifiedReplicationExternal('Submission 3', '9012', 'Submission 4', '3456');
		cy.assertSubmissionWizardCompleted();
	});	
})
