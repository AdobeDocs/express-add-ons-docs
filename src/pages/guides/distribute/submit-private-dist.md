# Submit for Private Distribution

### Step 1: Invoke the distribution modal
A new **Manage** button should now be displayed in your add-ons launchpad, and will invoke the in-app distribution experience when clicked.

![Manage button in launchpad](./img/distrib-manage.png)

If you haven't created any listings for your add-ons yet, then you will see the following modal:
![First add-on submission modal](./img/distrib-first-addon-modal.png)

If you have existing listings, your first screen will display them:
![First screen of submission modal with existing listings](./img/distrib-existing-list.png)

Select **Create New** from either and continue to step 2.

### Step 2: Create a new listing and distribution type
Next, you will choose how you want to distribute your add-on, whether it's to share privately only, or if you want it publicly available. Select **Private link**, and hit **Next**.
![](./img/dist-private-option.png)


### Step 3: Upload add-on package
The next step is to upload your package zip. Click on the **select from your computer** link and choose your add-on package zip from your file system.

![Empty upload modal](./img/distrib-private-upload-pkg.png)

<InlineAlert slots="text" variant="info"/>

This plugin package should contain the production-ready built content in the root of the zip (think in terms of content like from the `/dist` folder, but in the root of the zip and in the most production-ready form). We will not be building/compiling your source. You should try to reduce the size as much as possible. Minifying, uglifying, obfuscating, removing the sourcemaps etc are acceptable to use in producing your final bundle. 

The package will go through a verification process which may take a few seconds, so please be patient. 
![Empty upload modal](./img/distrib-private-verify-pkg.png)

If you receive an error, please check the following warning notes.

<InlineAlert slots="text" variant="warning"/>

- If you receive a `MANIFEST_NOT_FOUND_ERROR`, instead of zipping the folder containing the add-on files, please zip only the contents. In other words, the manifest file should be at **root** level of the extracted package.
- Your add-on package file size must not exceed 50 MB.
- In places where you are referring to paths, please ensure you are only using relative paths.
- Hidden files should not be present in your package zip.
You can use this command on MAC to zip your add-on and to ensure unnecessary files are not included:    `zip -r your_addon_name.zip . -x '**/.*' -x '**/__MACOSX' -x '*.DS_Store'`

Otherwise, you should see the following green check mark showing it's verified and hit **Next** to go to the next step.



### Step 4: Enter name, icon and release notes
Now you will be prompted to choose a unique *name* for your add-on, an *icon*, and *release notes*. Your add-on name will be validated when you tab out (or the field loses focus) before you will be allowed to move to the next step. You will know that it's verified by a green checkmark shown, or receive an error that it exists and you need to choose another. Once it's verified, click on the **Save draft and continue**. This will ensure you have a draft saved with your unique name and plugin package.


![](./img/distrib-private-name-icon.png)

<InlineAlert slots="text" variant="success"/>

The number of characters allowed for any given field above it on the right throughout the distribution experience, and see how many are available still as you are typing into it. For instance, the name allows a max of 25 characters.

Once you've entered the required fields, the **Save and create private link** button will be enabled.

![Successfully created link](./img/distrib-pr

<InlineAlert slots="text" variant="warning"/>

The **Save and create private link** button will only be enabled if you have entered all of the required data. Also, once yiy click he button, it may take a moment to send the package and details to the backend server to generate the link, so please be patient.

![Successfully created link](./img/distrib-private-save-create.png)

You can now click **Copy link** to copy your private link for sharing.

![Private link Details](./img/distrib-private-link-success.png)

<InlineAlert slots="text" variant="success"/>

You can also choose to view your submission details later from the add-on launchpad by clicking **Manage** again, and then selecting any existing listing. 
