# Review Guidelines

Before your add-on can be published, it needs to undergo a thorough review process. At Adobe, we believe in supporting developers to create add-on's that offer exceptional user experiences. Our review process allows us to strike a balance between providing you with a positive developer experience and ensuring that the approved add-on delivers outstanding user experiences for our mutual customers. We are committed to maintaining high standards and ensuring that all add-ons available on our Marketplaces meet our quality criteria.

## Guidelines by Section

-   [Publisher Profile](#publisher-profile)
-   [Add-on Listing Information](#publisher-profile)
-   [Functional Testing/Login](#functional-testing--login)
-   [Feature Testing](#feature-testing)
-   [User Interface](#user-interface)
-   [Localization](#localization)
-   [Accessibility Testing (Optional)](#accessibility-testing-optional)
-   [Usability Testing](#usability-testing)
-   [Performance](#performance)
-   [Security](#security)
-   [Monetization](#monetization)
-   [Compatibility](#compatibility)
-   [Testing](#testing)
-   [Edge Case Testing](#edge-case-testing)
-   [Submission Checklist](#submission-checklist)

## Publisher Profile

#### Adobe Brand Guidelines

Verify that the public profile content, including the name and description, adheres to [Adobe Branding Guidelines](https://partners.adobe.com/exchangeprogram/creativecloud/marketing/dev-brand-guide.html). This includes ensuring that the profile name and description do not violate any branding guidelines set by Adobe.

#### Logo Usage

Confirm that the profile logo used does not include any Adobe icons or dummy icons. The logo should be original and not violate any [Adobe Branding Guidelines](https://partners.adobe.com/exchangeprogram/creativecloud/marketing/dev-brand-guide.html).

#### Website URL

Verify that the profile website URL provided successfully opens the website and adheres to Adobe Branding guidelines. The website linked should be compliant with Adobe's branding guidelines and should not contain any inappropriate or misleading content.

## Add-on Listing Information

#### Name

Ensure that the add-on name is compliant with [Adobe Branding Guidelines](https://partners.adobe.com/exchangeprogram/creativecloud/marketing/dev-brand-guide.html) and is unique, not identical to any existing third-party add-on name. The add-on name should not violate any branding guidelines set by Adobe and should be original and relevant.

#### Description

Check that the add-on description is clear enough to understand the functionality of the add-on. The description should provide a clear and concise overview of the add-on functionality.

#### Summary

Verify that the add-on summary is clear and adheres to [Adobe Branding Guidelines](https://partners.adobe.com/exchangeprogram/creativecloud/marketing/dev-brand-guide.html). The summary should accurately reflect the add-on features and functionality in a concise manner, while adhering to the branding guidelines.

#### Support Email Address

Check that a proper support email address is provided, as per Adobe's requirements. The email address should be valid and reachable, and should comply with Adobe's guidelines for support contact information.

#### Screenshots

Ensure that the screenshots uploaded by the developer do not violate [Adobe Branding Guidelines](https://partners.adobe.com/exchangeprogram/creativecloud/marketing/dev-brand-guide.html). The screenshots should accurately depict the add-on features and functionality, and should not contain any inappropriate or misleading content.

#### Icon

The add-on icon should be original and should not violate any branding guidelines set by Adobe. If Adobe icons are used, proper approval from Adobe should be obtained.

#### Help URL

Confirm that the help URL provided by the developer launches the website correctly and that the content on the website is compliant with [Adobe Branding Guidelines](https://partners.adobe.com/exchangeprogram/creativecloud/marketing/dev-brand-guide.html). The linked website should provide accurate and relevant information about the add-on usage and functionality, and should adhere to Adobe's branding guidelines.

#### Privacy Policy/License Agreement

Check the privacy policy/license agreement and verify that it does not contain any wording that violates [Adobe Branding Guidelines](https://partners.adobe.com/exchangeprogram/creativecloud/marketing/dev-brand-guide.html). The privacy policy or license agreement should be in compliance with Adobe's branding guidelines and should not contain any misleading or inappropriate content.

#### Keywords

Verify that the keywords used by the developer make sense and do not contain anything derogatory. The keywords should accurately represent the add-on features and functionality, and should not violate any branding guidelines set by Adobe.

#### Release Section

Check the releases section and ensure that it highlights the latest functionality or improvements added in the version. The release notes should accurately describe the changes made in the latest version of the add-on, and should be relevant to the users.

## Functional Testing / Login

#### Provide Test Credentials

If the add-on functionality requires paid credentials such as login or license key, make sure that you provide test credentials specifically for testing purposes to the reviewers. The reviewer should be able to log in using these credentials and access all relevant functionalities of the add-on.

#### Indicate Direct Signup Not Supported

If the add-on requires a login, but direct signup is not supported anywhere, clearly mention this in the add-on description or documentation.

#### Check New Credentials Creation

If the add-on allows creation of new credentials for external services, test this functionality and verify if new credentials can be successfully created.

#### Logout Functionality

Add-ons must provide a proper logout functionality.

#### License Key Activation

If the add-on requires activation using a license key, test the activation process to ensure that it is successful and the add-on is activated properly.

## Feature Testing

#### Loading Indicator

Add-ons should show a loading indicator when it takes noticeable time to load the content, to provide visual feedback to the users.

#### Text Box Input

Verify that text boxes in the add-on support English characters, special characters, and numbers as expected. Test for different types of inputs to ensure proper handling.

#### Navigation and Buttons

Ensure that the user does not get "stuck" on certain screens with no way to navigate out in add-ons with multiple panels/screens. Test all buttons provided in the add-on to confirm that they perform the desired action when clicked.

<!-- ### Offline Functionality -->
<!-- Verify the add-on behavior offline and check if it gracefully handles the situation when an internet connection is required for certain functionality, providing proper error messages or fallback options. -->

#### Online Functionality

Test the add-on functionality after reconnecting to the internet to ensure that it resumes normal operation.

#### Importing Images and Videos

Verify that the add-on is able to import images and videos as intended.

#### Storing User Data

Verify that the add-on stores only necessary information on the user’s machine. For add-ons that store a lot of data, verify that the add-on properly handles errors that may arise due to exceeding storage quotas.

#### Drag and Drop Functionality

If applicable, confirm that the user is able to drag and drop images and videos on the document, and this functionality works as intended.

#### Host App Stability

Check that the add-on does not crash the host app, and it operates smoothly without any stability issues.

## User Interface

#### Meaningful Content

Ensure that all screens in the add-on have meaningful content and there are no empty screens, providing a seamless user experience.

#### Button Display

Verify that all buttons in the add-on are displayed correctly and do not overlap with each other, especially when multiple buttons are available on the same screen, to ensure proper usability.

#### Multilingual Support

Check that the add-on user interface does not break or malfunction when users input special characters or alphabets from different languages, ensuring proper handling of multilingual support.

#### Scroll Bar Availability

Scroll Bar Availability: If the content in the add-on is not fully visible on the screen, confirm that the user can scroll the content so that they can view the complete content.

#### Dialogs

Use workflow-blocking dialogs sparingly; don’t show a dialog just to show a success message, unless there’s additional information the user needs to see. Leverage in-panel UI to show this kind of information so that the user’s workflow isn’t unnecessarily interrupted.

## Localization

#### English Language Support

The developer has the flexibility to create the add-on in any other supported language. However, it's important to ensure that the add-on also includes support for English.

#### Multilingual UI Functionality

Ensure that the add-on user interface remains intact and functional when switched to other supported languages.

<InlineAlert slots="text" variant="warning"/>

Check that the add-on strings or text content are not truncated or cut off in any supported locale, ensuring that the complete text is displayed appropriately.

## Accessibility Testing (Optional)

1. Verify that the add-on meets accessibility guidelines, such as WCAG 2.0 or higher, ensuring that it is usable by people with disabilities.
2. Check that the add-on user interface is keyboard accessible, providing proper focus states, and allowing for easy navigation and interaction using keyboard only.
3. Ensure that the add-on provides proper alternative text for images, labels for form fields, and other accessibility features to assist users with visual impairments or other disabilities.
4. Verify that the add-on colors, contrast, and fonts meet accessibility standards and are easily readable by users with visual impairments.

<InlineAlert slots="text" variant="success"/>

See the [Adobe Accessibility Page](https://www.adobe.com/accessibility.html) for help with your accessibility testing.

## Usability Testing

1. Ensure your add-on UI blends seamlessly with Adobe Express by adhering to the [Adobe Spectrum](../design/spectrum.md#introduction-to-spectrum) design language and incorporating commonly used patterns found in the Adobe Express UI. While it's not mandatory for add-ons to use Adobe's Spectrum libraries, it can significantly simplify the development process.
2. Ensure that the add-on user interface and controls are responsive, functional, and usable across different devices, screen sizes, and browsers.
3. Verify that any error messages, warnings, or notifications displayed by the add-on are clear, informative, and helpful to the user.
4. Check that the add-on provides proper feedback and validation for user inputs, such as displaying error messages for invalid inputs or confirmation messages for successful actions

## Performance

1. Check the performance of the add-on in terms of loading time, response time, and resource utilization, and ensure that it meets acceptable standards. Keep in mind users will have varied experiences depending on things like network connection etc.
2. Verify that the add-on does not cause any significant slowdown or crashes in the host app during normal usage.
3. Check that the add-on does not consume excessive system resources, such as CPU or memory, which could impact the performance of the host app or the user's system.

## Security

1. Ensure that the add-on does not contain any malicious code, viruses, or malware that could harm the user's system or compromise their data.
2. Verify that the add-on does not access or transmit any sensitive user information without proper authorization or consent.
3. Check that the add-on does not have any known security vulnerabilities, such as unsecured communication channels, weak authentication mechanisms, or potential injection attacks.
4. Confirm that the add-on follows secure coding practices, such as input validation, and proper error handling, to prevent security vulnerabilities.

## Monetization

1. At this time, the only way to monetize is by using a third party provider, and ensuring you choose one that provides safety measures, security and proper payment processing. Some options you may want to consider include Gumroad, Stripe, Paddle and FastSpring.
2. In the first line of the add-on's description, provide information about any requirements such as login, in-app purchases, or license requirements.

## Compatibility

1. Verify that the add-on is compatible with the latest version of the host app and any specified minimum version requirements.
2. Check that the add-on does not conflict with other installed add-on or extensions in the host app.
   Ensure that the add-on does not cause any compatibility issues with other software or hardware components on the user's system.
3. Confirm that the add-on works correctly on different operating systems, browsers, or devices as specified by the developer.

## Testing

1. Perform thorough testing of the add-on to uncover any defects or issues that may affect its functionality, usability, or performance.
2. Verify that all features and functionality of the add-on are tested, including any specific scenarios or edge cases identified by the developer or reviewer.
3. Ensure that the add-on is tested in different environments, configurations, and scenarios to uncover any potential issues or bugs.

## Edge Case Testing

1. Perform testing on various edge cases, boundary values, or extreme scenarios to uncover any potential issues or unexpected behavior.
2. Verify that the add-on handles edge cases, such as empty inputs, long inputs, or inputs with special characters, gracefully and without errors.
3. Check that the add-on handles boundary values, such as minimum or maximum allowed values, correctly without any unexpected behavior.
4. Verify that the add-on behaves correctly in extreme scenarios, such as low system resources, poor network conditions, or unexpected interruptions.
5. Add-ons that use OAuth flows should indicate to users when a popup window has been blocked by the browser's popup blocker. This can be achieved by displaying a message on the web page or in the add-on UI. This is important to avoid confusion and frustration for users who may feel like the add-on is not responding when they try to sign in. Additionally, the API should return the error code POPUP_BLOCKED when a popup window is blocked during the OAuth flow.
6. For any add-ons that generate assets via AI or import assets from an asset repository, include information about usage rights in the add-on's description. It is important to ensure that the usage rights provided in the description are accurate and up-to-date.
7. Tab navigation is a common and important way for users to navigate websites and applications, particularly for users with disabilities who rely on keyboard navigation. Add-ons should not interfere or override tab navigation, as this can create barriers to accessibility for users who rely on it.

## Submission Checklist

1. Verify that all required files, assets, and documentation are included in the add-on submission, as per Adobe's submission guidelines.
2. Confirm that the add-on is submitted using the appropriate submission process and tools provided by Adobe.
3. Ensure that the add-on submission includes accurate and up-to-date information, including add-on name, version, authorship, and contact information.
4. Check that the add-on submission adheres to all relevant legal and licensing requirements, including proper attribution, copyright, and intellectual property rights.
5. Following these guidelines will help ensure that the add-on being developed adheres to Adobe's Branding guidelines, meets functional requirements, performs well, is secure, compatible, well-documented, and is properly submitted for review. It is important for the developer to thoroughly test the add-on in different scenarios and environments to uncover any issues or defects that may affect its functionality, usability, or performance, and address them before submitting the add-on for review.
6. Share the valid testing credentials with the review team so that they can validate the functionality.

<InlineAlert slots="text" variant="warning"/>

Please ensure you do not refer to your _add-on_ as a "plugin" anywhere in the content of your UI or submissionm as it will just be confusing to end-users.

# Final Considerations

## Timelines and Outcomes

-   You can expect to hear from us regarding your add-on submission within 10 business days, though it's typically much faster on average.

-   Ultimately, your submission will either be approved or rejected, though in some cases, we may reach out to you with questions before we send you the outcome of the review.

-   If your submission is rejected, we will provide the reasons. You are welcome to ask for clarifications. Once you have addressed the reasons for rejection in your listing information, add-on, and/or associated content, you are welcome to resubmit.

<InlineAlert slots="text" variant="success"/>

Our goal is to provide you the best developer experience during the review process that we can, while alson ensuring approved add-ons offer a great user experience for our mutual customers.

## Top Rejection Reasons

Add-ons are reviewed with the goal of making sure users have a positive experience with the add-ons they install, and thus sometimes they will need to be rejected. This is most often seen when a developer submits an add-on for the first time. If an add-on is rejected, certain changes are requested to be made before they can be re-submitted for review.

### Non-compliance with Adobe Branding Guidelines

Developers often use Adobe brand assets without getting prior permission, (for example, Adobe's "A" icon). This violates the [Adobe Branding Guidelines](https://partners.adobe.com/content/dam/tep_assets/public/public_1/documents/Adobe-Creative-Cloud-Developer-Brand-Guide.pdf). It is advised that before you start using the Adobe assets, please get permission from the Adobe Branding Team by contacting them at [brand@adobe.com](mailto:brand@adobe.com). Once the permissions are granted you can start using Adobe assets on your website and in your screenshots.

### Add-on does not function as described

-   At the time of testing, the review team validates all of the functionality of your add-on. Please that your add-on is functioning as advertised prior to submission, and that all of the features are working properly.

-   Code against silent failures. If the add-on user attempts to use an unsupported function, the add-on should not fail silently. Add-ons must display a dialog that this action/functionality is not supported so that users understand it, and avoid repeating the same action.
