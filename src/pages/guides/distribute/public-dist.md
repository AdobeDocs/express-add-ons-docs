---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Add-on Manifest
title: Public add-on distribution
description: A guide to public distribution of your add-on. 
contributors:
  - https://github.com/hollyschinsky
---

# Public add-on Distribution

## Overview

This guide is provided to help ensure your add-on distribution process goes as smoothly as possible. We've provided a list of all of the things you can prepare in advance, as well as the steps to follow to actually submit your add-on for public distribution. Please note, public distribution is subject to a quality review by our team according to our [Guidelines](./guidelines/index.md).

## Preparing for Submission

This section outlines everything you'll need in order to be prepared for submitting your add-on for public distribution.

### 1. Prepare your metadata

**\* Indicates Required**

| Name                    | Character Length  | Description   |
| -------------:          | ------------------| -----------:  |
| **\* Add-on name**      | 25                | A unique name for your add-on.|
| **\* Summary**               | 50                | A short description of what your add-on does.|
| **\* Full Description**      | 1000              | Full context and description of your add-on and its features |
| **\* Help URL**              | 1000              | URL for your users to get help (ie: https://www.example.com/)  |
| **\* Support email address** | 1000              | An email address that users of your add-on can contact for support |
| **Privacy Notice**          | 1000              | URL of your privacy notice (ie: https://www.example.com/) |
| **End User License Agreement(EULA)**| 1000      | End User License Agreement URL (ie: https://www.example.com/) |
| **Keywords**                | 100              | Keywords to help users find your add-on (comma-separated) |
| **Release notes**       | 1000  | Provide information specific to this version of the add-on |

### 2. Prepare your assets

| Type           | Format      | Description   |
| -------------: | ------------| -----------:  |
| * 36x36 icon           | `.jpg/png`  | a 36x36 sized icon representing your add-on |
| * 64x64 icon           | `.jpg/png`  | a 64x64 sized icon representing your add-on |
| * 144x144 icon         | `.jpg/png`  | a 144x144 sized icon representing your add-on |
| * Screenshot           | `.jpg/png`  | a 1360x800 sized screenshot to show users how to use your add-on |
|   Additional screenshots | `.jpg/png` | 4 more optional 1360x800 sized screenshots for your add-on |
| ** Publisher logo       | `.jpg/png`  | 250x250 sized logo to represent you or your company |

<InlineAlert slots="text" variant="info"/>

** A publisher logo is only required the first time you submit for distribution, and if you've never created a publisher profile.

### 3. Prepare your add-on package

The CLI contains a handy script to help you with this step. Open your terminal and navigate into the root of your add-on project, then run the then run the following command:

```bash
npm run package
```

The result will be a distributable zip of your add-on package with the name `dist.zip`, and can be used as the file you upload in this step. This add-on package contains the **production-ready built content** in the *root* of the zip file, similar to what's built into the `/dist` folder.

### 4. Carefully [review our set of guidelines](./guidelines/index.md)

## Submission Steps

This set of steps can be followed when you have everything prepared, have carefully reviewed the guidelines, and are ready to submit your add-on for review via the Adobe Express in-app distribution modal.

### Step 1: Invoke the distribution modal

Locate the **Manage** button in the add-ons launchpad and click it to invoke the in-app distribution modal.

![Manage button in launchpad](./img/manage.png)

If you haven't created any listings for your add-ons yet, then you will see the following in the modal:

![First add-on submission modal](./img/distrib-first.png)

If you have already created existing listings, the first screen displayed will show them:

![First screen of submission modal with existing listings](./img/distrib-existing2.png)

Select **Create New** from either and continue to step 2.

### Step 2: Add-on Container Settings

Your add-on container will be created and a settings panel like the one shown below will be presented. will be shown. In this panel you will be provided with a unique subdomain URL for where your add-on will be hosted and an option to delete the add-on if needed.

![](./img/settings-panel.png)

### Step 3: Create a new public listing

Next, click on the **Public listing** tab and you will be presented with the screen below where you can press the **Create public link** button to proceed.

![Public link option](./img/empty-public-listing.png)

### Step 4: Upload your add-on package

The next step is to upload your package zip. Click on the **select from your computer** link and choose your add-on package zip.

![Empty upload modal](./img/distrib-upload-empty1.png)

<InlineAlert slots="text" variant="success"/>

The CLI contains a handy script to help you with this step. Open your terminal and navigate into your add-on project, then run the command: **`npm run package`**. The result will be a distributable zip of your add-on package with the name `dist.zip`, and can be used as the file you upload in this step. This add-on package contains the **production-ready built content** in the *root* of the zip file, similar to what's built into the `/dist` folder.

The package will go through a verification process which may take a few seconds, so please be patient. You will see a green checkmark and message that it's verified once it's complete. Press **Next** to go to the next step.

![Upload verified](./img/pub-upload-verified.png)

If you receive an error, please check the following warning notes.

<InlineAlert slots="text" variant="warning"/>

- If you receive a `MANIFEST_NOT_FOUND_ERROR`, instead of zipping the folder containing the add-on files, please zip only the contents. In other words, the manifest file should be at **root** level of the extracted package.
- Your add-on package file size must not exceed 50 MB.
- In places where you are referring to paths, please ensure you are only using relative paths.
- Hidden files should not be present in your package zip.
You can use this command on MAC to zip your add-on and to ensure unnecessary files are not included:    `zip -r your_addon_name.zip . -x '**/.*' -x '**/__MACOSX' -x '*.DS_Store'`

### Step 5: Choose your add-on name

In this step, you will be prompted to choose a unique name for your add-on. Your add-on name will be validated once you tab out, (or the field loses focus). This validation must occur before you can move to the next step. You will know that it's verified with a green checkmark (shown below). If you receive an error that it already exists, then you will need to choose another name. Once it's verified, click on the **Save draft and continue**. This will ensure you have a draft saved with your unique name and plugin package.

<InlineAlert slots="text" variant="success"/>

The number of characters allowed for any given field is shown above it throughout the distribution experience (for instance, the name field allows a max of 25 characters). The number will automatically update with the remaining amount as you're typing into it.

![](./img/pub-name2.png)

### Step 6: Enter the listing details

You should now see a success message that your draft was saved, and will be able to start filling our your listing details, starting with the three required icons:
![](./img/distrib-draft-listing-initial.png)

followed by the rest of the information you want to associate your listing. Please ensure your URLs and email addresses are properly formed to avoid any unnecessary errors.

![](./img/pub-listing2.png)

<InlineAlert slots="text" variant="success"/>

The `*` indicates required fields. Note that you can skip entering these required fields if you are only planning to save a draft with your current edit, though you will not be able to submit it until they are completed.

Once you finish entering your listing details, you should see a green checkmark for **Listing Details** in the left rail showing your progress. You can then hit **Continue** to move on to the next step.

<InlineAlert slots="text" variant="success"/>

You can use the "Back" button throughout the distribution experience when you need to go back to change any details at any step.

### Step 7: Upload screenshots

In the next screen, you will be prompted to should upload 1-5 screenshots to show off your add-on and what it's all about. **NOTE**: At least one screenshot is required.

You will see the green checkmark for **Screenshots** in the left rail once you upload at least one, and at this point you can choose to **Continue**.

<InlineAlert slots="text" variant="warning"/>

Sometimes it may take a moment to upload the images to the back-end server before the **Continue** button will be highlighted.

### Step 8: Enter the version details

Next you will specify your version details. The package that you entered in the first step will be shown by default, but you can replace it if you have made an update since you originally uploaded it in this step as well. You can also select the languages your add-on is supported in, and enter any optional release notes at this step. You will see the green checkmark for **Version details** in the left rail and can press **Continue** to move on.

### Step 9: Enter the AI usage details

The rise of Generative AI offers significant benefits for add-ons and streamlines content creation and workflows. However, this technology also brings the risk of users encountering inappropriate or offensive content. While Adobe encourages user choice regarding add-ons using Generative AI, transparency is paramount. We ensure clear, upfront communication, guarantee appropriate content, and respect intellectual property rights.

Carefully review our [AI usage guidelines](./guidelines/genai/index.md) to get the latest information on Adobe’s requirements and recommendations to try add-ons that employ Generative AI technology.

### Step 10: Enter the monetization details

The **Monetization details** tab allows developers to declare the payment option they support for their add-on. A selection is required for any new add-ons submitted, and existing add-ons can be updated to include or change the selection. The monetization details entered in this tab can be seen in the preview of the listing before submission, and in the add-on details once published.

![Monetization details](./img/monetization.png)

Developers can choose from various payment options, including free, one-time payments, recurring subscriptions, micro-transactions, and more. Select the monetization options that suit your preferences best. Use the [examples](./guidelines/monetization.md#requirements-for-monetizing-your-add-ons) outlined in the guidelines for monetizing add-ons to help you make informed decisions about which options to choose. 

- The *Other* option is provided for developers to choose when their current setup does not fit the provided options.
- The final *additional details* text area allows developers to provide additional payment terms like *"7 day free trial"* or *"$9.99/month"* and is optional for all payment choices except *Other*. We encourage the use of this field to clearly state any specific payment details.

Developers can preview the monetization details that will be shown to users by clicking the **Preview listing** button. Depending on the payment selection, different details will automatically be displayed in the add-on listing. If the payment choice selected was not free, an **Upgrade available** badge will be displayed in the details as shown below:

  ![Upgrade available](./img/preview-listing-with-upgrade.png)

along with specific default text describing the choice selected (ie: "*...for a one-time purchase*", "*...with a recurring subscription*", "*...purchase assets or features individually or in packages*") - and then **Checkout is handled by the developer outside of Adobe Express**. Any additional custom details entered by the developer are then shown below the default checkout message, as well as a timestamp indicating when the listing was last updated.

In the case of the **free** payment selection, the following would simply be shown:

![Free option](./img/preview-free-option.png)

<!-- If you wish to explore alternative monetization methods for your add-on, you may do so by selecting **Other** and providing relevant details in the **Additional Details** section. This information will be visible to Adobe Express users within the add-on details. We recommend clearly stating the pricing for add-on upgrades, any recurring fees, and any additional costs that users may encounter. -->

Carefully review our [monetization guidelines](./guidelines/monetization.md) to get the latest information on Adobe’s requirements and recommendations for monetizing your add-ons.

### Step 11: Create a publisher profile

<InlineAlert slots="text" variant="info"/>
You will only see this step the first time you submit an add-on and if you've never created a publisher profile prior to this submission.

Fill our your publisher details and upload a 250x250 logo, then hit **Continue**.

<!-- ![Publisher Profile](./img/pub-profile2.png)-->

### Step 12: Final submission step

The final submission step prompts you to enter any **Notes to reviewer** and then you can choose to **Submit for review** if you've entered all of the required data and you are done making any more changes.

![Version Details](./img/reviewer-notes.png)

<InlineAlert slots="text" variant="warning"/>

The **Submit for review** button will only be enabled if you have entered all of the required data.

![Submission complete](./img/submission-complete.png)

**View submission details** will display the details of your add-on submission:

![View Submission Details](./img/submission-details.png)

<InlineAlert slots="text" variant="success"/>

You can also choose to view your submission details later from the add-on launchpad by clicking **Manage** again, and then selecting any existing listing. If it's in a *Draft* status, you can click the ellipsis button "..." and choose **edit** if you want to update the details.

## Post-Submission details and insights

You can choose to revisit your submission details later if you need to update it, or if you want to download insights for your add-on. To do so, choose **Manage** from the add-on launchpad again, and then select your add-on listing. You will see the details and options available as shown in the example screenshot below.

![public listing details](./img/public_listing_details.png)

The **Download insights** button will provide some analytics for your published add-ons in the form of a `.csv` file, named with the name of your add-on, and appended with `_public` or `_private` depending on the listing type (ie: `AmazingAddOn_public.csv`). The insights data available includes the number of installs, uninstalls and invocations of your add-on per week. An example `.csv` is shown below for reference:

![sample insights](./img/sample-insights.png)
