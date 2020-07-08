Cypress.Commands.add('getSubmissionWizardStepSubmitButton', (step) => {
	cy.get('form[id^=submitStep' + step + 'Form] button[id^=submitFormButton-]');
});

Cypress.Commands.add('finishSubmissionWizardAsIdentifiedReplicationExternal', (originalStudyTitle, originalStudyDoi, replicationStudyTitle, replicationStudyDoi) => {
	// submission wizard step "Start"
	cy.get('div[id=pkp_submissionChecklist] input[type=checkbox]').click({multiple: true});
	cy.get('input[id=privacyConsent]').click();

	cy.getSubmissionWizardStepSubmitButton(1).click();
	
	// submission wizard step "Enter metadata"
	cy.withinCustomForm('Original study', () => {
		cy.getCustomFormInput('Title').type(originalStudyTitle);
		cy.getCustomFormInput('DOI').type(originalStudyDoi);
		cy.getCustomFormInput('Weblink to article (URL)').type('https://www.submissions.com/' + originalStudyDoi);
	});

	cy.withinCustomForm('Replication study', () => {
		cy.getCustomFormInput('Title').type(replicationStudyTitle);
		cy.getCustomFormInput('DOI').type(replicationStudyDoi);
		cy.getCustomFormInput('Weblink to article (URL)').type('https://www.submissions.com/' + replicationStudyDoi);
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
});

Cypress.Commands.add('assertSubmissionWizardCompleted', () => {
	// submission wizard step "Next steps"
	cy.get('h2', {timeout: 15000}).contains('Submission complete');
});


