# Public add-on Distribution

## Overview
In this section, you will learn how to create a public listing for your add-on that will be shared for the millions of Adobe Express users to discover and use by following the steps below.

<InlineAlert slots="text" variant="info"/>

Public distribution is subject to a quality review by our team according to the [Review Guidelines](./review_guidelines.md).


## Step 1: Open the distribution modal
A new **Manage** button should now be displayed in your add-ons launchpad, and will invoke the in-app distribution experience when clicked.

![Manage button in launchpad](./img/manage.png)

If you haven't created any listings for your add-ons yet, you will see a modal with a list of your previous submissions:

![First add-on submission modal](./img/distrib-first.png)

If you have already created existing listings, the first screen displayed will show them:

![First screen of submission modal with existing listings](./img/distrib-existing2.png)

Select **Create New** from either and continue to step 2.

## Step 2: Create a new listing and distribution type
Next, you will choose how you want to distribute your add-on, whether it's to share privately only, or if you want it publicly available. Select **Public listing**, and hit **Next**.

![Public listing choice](./img/distrib-public.png)


## Step 3: Upload add-on package
The next step is to upload your package zip. Click on the **select from your computer** link and choose your add-on package zip.

![Empty upload modal](./img/distrib-upload-empty1.png)

<InlineAlert slots="text" variant="info"/>

This add-on package should contain the **production-ready built content** in the *root* of the zip file. Compare to content you would find in the `/dist` folder, butplaced in the root of your `.zip` package, and in the most production-ready form. We will not be building or compiling your source. You should also reduce the size as much as possible. Minifying, uglifying, obfuscating or removing the sourcemaps are acceptable to use in producing your final bundle. You can use the command `npm run package` to create a package. It will create a `dist.zip` that you can use for uploading. 

The package will go through a verification process which may take a few seconds, so please be patient. You will see a green checkmark and message that it's verified once it's complete. Press **Next** to go to the next step.

![Upload verified](./img/pub-upload-verified.png)

If you receive an error, please check the following warning notes.

<InlineAlert slots="text" variant="warning"/>

- If you receive a `MANIFEST_NOT_FOUND_ERROR`, instead of zipping the folder containing the add-on files, please zip only the contents. In other words, the manifest file should be at **root** level of the extracted package.
- Your add-on package file size must not exceed 50 MB.
- In places where you are referring to paths, please ensure you are only using relative paths.
- Hidden files should not be present in your package zip.
You can use this command on MAC to zip your add-on and to ensure unnecessary files are not included:    `zip -r your_addon_name.zip . -x '**/.*' -x '**/__MACOSX' -x '*.DS_Store'`


## Step 4: Choose your add-on name
In this step, you will be prompted to choose a unique name for your add-on. Your add-on name will be validated once you tab out, (or the field loses focus). This validation must occur before you can move to the next step. You will know that it's verified with a green checkmark (shown below). If you receive an error that it already exists, then you will need to choose another name. Once it's verified, click on the **Save draft and continue**. This will ensure you have a draft saved with your unique name and plugin package.

<InlineAlert slots="text" variant="success"/>

The number of characters allowed for any given field above it on the right throughout the distribution experience, and see how many are available still as you are typing into it. For instance, the name allows a max of 25 characters.

![](./img/pub-name2.png)


## Step 5: Enter the listing details
You should now see a success message that your draft was saved, and will be able to start filling our your listing details, starting with the three required icons:
![](./img/distrib-draft-listing-initial.png)

followed by the rest of the information you want to associate your listing. Please ensure your URLs and email addresses are properly formed to avoid any unnecessary errors.

![](./img/pub-listing2.png)

<InlineAlert slots="text" variant="success"/>

The `*` indicates required fields. Note that you can skip entering these required fields if you are only planning to save a draft with your current edit, though you will not be able to submit it until they are completed. 

Once you finish entering your listing details, you should see a green checkmark for **Listing Details** in the left rail showing your progress. You can then hit **Continue** to move on to the next step.
![](./img/listing-details.png)


<InlineAlert slots="text" variant="success"/>

You can use the "Back" button throughout the distribution experience when you need to go back to change any details at any step.

## Step 6: Upload screenshots
In the next screen you will be prompted to should upload 1-5 screenshots to show what your add-on is all about. **NOTE**: At least one screenshot is required.

![Upload screenshot](./img/screenshot.png) 

You will see the green checkmark for **Screenshots** in the left rail once you upload at least one, and at this point you can choose to **Continue**.

![Uploaded screenshot](./img/screenshot2.png)

<InlineAlert slots="text" variant="warning"/>

Sometimes it may take a moment to upload the images to the back-end server before the **Continue** button will be highlighted.

## Step 7: Enter the version details
Next you will specify your version details. The package that you entered in the first step will be shown by default, but you can replace it if you have made an update since you originally uploaded it in this step as well. You can also enter any optional release notes at this step. You will see the green checkmark for **Version details** in the left rail and can press **Continue** to move on.

![Version Details](./img/release-notes.png)

## Step 8: Create a publisher profile
You will only see this step the first time you submit an add-on and if you've never created a publisher profile prior to this submission. Fill our your publisher details and upload a 250x250 logo, then hit **Continue**.

![Publisher Profile](./img/pub-profile2.png)

## Step 9: Final submission step
The final submission step prompts you to enter any **Notes to reviewer** and then you can choose to **Submit for review** if you've entered all of the required data and you are done making any more changes. 

![Version Details](./img/reviewer-notes.png)

<InlineAlert slots="text" variant="warning"/>

The **Submit for review** button will only be enabled if you have entered all of the required data. 

![Submission complete](./img/submission-complete.png)

**View submission details** will display the details of your add-on submission:

![View Submission Details](./img/submission-details.png)

<InlineAlert slots="text" variant="success"/>

You can also choose to view your submission details later from the add-on launchpad by clicking **Manage** again, and then selecting any existing listing. If it's in a *Draft* status, you can click the ellipsis button "..." and choose **edit** if you want to update the details.
