import '../support/custom-form-commands';
import '../support/submission-wizard-commands';

describe('Data suite tests', function() {
	it('Create submissions of type "Identified Replication (external)"', function() {
		let user = Cypress.env('ADMIN_USER');
		cy.login(user, Cypress.env('ADMIN_PASSWORD'));

		// forcing click otherwise Cypress will complain about a display: none because it does not seem to understand media queries
		cy.get('a').contains(user).click({force: true});
		cy.get('a').contains('Dashboard').click({force: true});

		cy.get('a').contains('Submissions').click();
		cy.get('.pkp_nav_add_submission').find('a').contains('Identified Replication (external)').click({force: true});

		// submission wizard step "Start"
		cy.get('div[id=pkp_submissionChecklist] input[type=checkbox]').click({multiple: true});
		cy.get('input[id=privacyConsent]').click();

		cy.getSubmissionWizardStepSubmitButton(1).click();

		// submission wizard step "Enter metadata"
		cy.withinCustomForm('Original study', () => {
			cy.getCustomFormInput('Title').type('Submission 1');
			cy.getCustomFormInput('DOI').type('1234');
			cy.getCustomFormInput('Weblink to article (URL)').type('https://www.submissions.com/1');
		});

		cy.withinCustomForm('Replication study', () => {
			cy.getCustomFormInput('Title').type('Submission 2');
			cy.getCustomFormInput('DOI').type('5678');
			cy.getCustomFormInput('Weblink to article (URL)').type('https://www.submissions.com/2');
		});

		cy.withinCustomForm('Description of the replication', () => {
			cy.getCustomFormTextarea('Type of replication').type('Lorem ipsum dolor sit amet');
			cy.getCustomFormTextarea('Result of the replication').type('Donec maximus mollis sagittis');
			cy.getCustomFormTextarea('Summary of replication').type('Etiam lacinia quis nisl nec gravida');
			cy.getCustomFormTextarea('Comparability assessment').type('Integer ut semper elit');
		});

		cy.getSubmissionWizardStepSubmitButton(3).click();

		// submission wizard step "Confirmation"
		cy.getSubmissionWizardStepSubmitButton(4).click();
		cy.get('button.ok.pkpModalConfirmButton').click();

		// submission wizard step "Next steps"
		cy.get('h2', {timeout: 15000}).contains('Submission complete');
	});
})
