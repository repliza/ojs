<?php
/**
 * @file classes/components/form/context/AppearanceSetupForm.inc.php
 *
 * Copyright (c) 2014-2020 Simon Fraser University
 * Copyright (c) 2000-2020 John Willinsky
 * Distributed under the GNU GPL v3. For full terms see the file docs/COPYING.
 *
 * @class AppearanceSetupForm
 * @ingroup classes_controllers_form
 *
 * @brief A preset form for general website appearance setup, such as uploading
 *  a logo.
 */
namespace APP\components\forms\context;
use \PKP\components\forms\context\PKPAppearanceSetupForm;
use \PKP\components\forms\FieldUploadImage;
use \PKP\components\forms\FieldText;

class AppearanceSetupForm extends PKPAppearanceSetupForm {

	/**
	 * @copydoc PKPAppearanceSetupForm::__construct()
	 */
	public function __construct($action, $locales, $context, $baseUrl, $temporaryFileApiUrl, $uploadImageUrl) {
		parent::__construct($action, $locales, $context, $baseUrl, $temporaryFileApiUrl, $uploadImageUrl);

		$this->addField(new FieldUploadImage('journalThumbnail', [
				'label' => __('manager.setup.journalThumbnail'),
				'tooltip' => __('manager.setup.journalThumbnail.description'),
				'isMultilingual' => true,
				'value' => $context->getData('journalThumbnail'),
				'baseUrl' => $baseUrl,
				'options' => [
					'url' => $temporaryFileApiUrl,
				],
			]), [FIELD_POSITION_AFTER, 'pageHeaderLogoImage']);


		$this->addField(new FieldUploadImage('pageFooterLogoImage', [
				'label' => __('manager.setup.pageFooterLogoImage'),
				'value' => $context->getData('pageFooterLogoImage'),
				'isMultilingual' => true,
				'baseUrl' => $baseUrl,
				'options' => [
					'url' => $temporaryFileApiUrl,
				],
			]), [FIELD_POSITION_AFTER, 'pageFooter']);

		$this->addField(new FieldText('pageFooterLogoImageLinkUrl', [
				'label' => __('manager.setup.pageFooterLogoImageLinkUrl'),
				'isMultilingual' => true,
				'value' => $context->getData('pageFooterLogoImageLinkUrl'),
				'size' => 'large',
			]), [FIELD_POSITION_AFTER, 'pageFooterLogoImage']);
	}
}
