/*!
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */

'use strict';
/* global element, by, expect */

// #############################################################################
// INTEGRATION TEST PAGE OBJECT

var cmsProtractorHelper = require('cms-protractor-helper');

var peoplePage = {
    site: 'http://127.0.0.1:8000/en/',

    // log in
    editModeLink: element(by.css('.inner a[href="/?edit"]')),
    usernameInput: element(by.id('id_cms-username')),
    passwordInput: element(by.id('id_cms-password')),
    loginButton: element(by.css('.cms_form-login input[type="submit"]')),
    userMenus: element.all(by.css('.cms_toolbar-item-navigation > li > a')),
    testLink: element(by.css('.selected a')),

    // adding new page
    userMenuDropdown: element(by.css(
        '.cms_toolbar-item-navigation-hover')),
    administrationOptions: element.all(by.css(
        '.cms_toolbar-item-navigation a[href="/en/admin/"]')),
    sideMenuIframe: element(by.css('.cms_sideframe-frame iframe')),
    pagesLink: element(by.css('.model-page > th > a')),
    addConfigsButton: element(by.css('.object-tools .addlink')),
    addPageLink: element(by.css('.sitemap-noentry .addlink')),
    titleInput: element(by.id('id_title')),
    slugErrorNotification: element(by.css('.errors.slug')),
    saveButton: element(by.css('.submit-row [name="_save"]')),
    editPageLink: element(by.css('.col1 [href*="preview/"]')),

    // adding new group
    breadcrumbsLinks: element.all(by.css('.breadcrumbs a')),
    groupsLink: element(by.css(
        '.model-group > th > [href*="/aldryn_people/group/"]')),
    editConfigsLink: element(by.css('.results th > a')),
    englishLanguageTab: element(by.css(
        '.parler-language-tabs > .empty > a[href*="language=en"]')),
    nameInput: element(by.id('id_name')),
    saveAndContinueButton: element(by.css('.submit-row [name="_continue"]')),
    successNotification: element(by.css('.messagelist .success')),

    // adding new people entry
    addPersonButton: element(by.css('.model-person .addlink')),
    editPersonLinks: element.all(by.css(
        '.results th > [href*="/aldryn_people/person/"]')),

    // adding people block to the page
    aldrynPeopleBlock: element(by.css('.aldryn-people')),
    advancedSettingsOption: element(by.css(
        '.cms_toolbar-item-navigation [href*="advanced-settings"]')),
    modalIframe: element(by.css('.cms_modal-frame iframe')),
    applicationSelect: element(by.id('application_urls')),
    peopleOption: element(by.css('option[value="PeopleApp"]')),
    saveModalButton: element(by.css('.cms_modal-buttons .cms_btn-action')),
    peopleEntryLink: element(by.css('.aldryn-people-article > h2 > a')),
    personTitle: element(by.css('.aldryn-people-detail h2 > div')),

    // deleting people entry
    deleteButton: element(by.css('.deletelink-box a')),
    sidebarConfirmationButton: element(by.css('#content [type="submit"]')),

    cmsLogin: function (credentials) {
        // object can contain username and password, if not set it will
        // fallback to 'admin'
        credentials = credentials ||
            { username: 'admin', password: 'admin' };

        peoplePage.usernameInput.clear();

        // fill in email field
        return peoplePage.usernameInput.sendKeys(credentials.username)
            .then(function () {
            peoplePage.passwordInput.clear();

            // fill in password field
            return peoplePage.passwordInput.sendKeys(credentials.password);
        }).then(function () {
            peoplePage.loginButton.click();

            // wait for user menu to appear
            cmsProtractorHelper.waitFor(peoplePage.userMenus.first());

            // validate user menu
            expect(peoplePage.userMenus.first().isDisplayed()).toBeTruthy();
        });
    }

};

module.exports = peoplePage;
