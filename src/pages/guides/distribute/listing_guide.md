# Add-on Listing Guide

### Listing Details

Your listing metadata provides Adobe and users with details about the add-on you are currently submitting. See the [add-on version details below](#add-on-version-details) for the metadata that is submitted for each add-on version.

The information you add in the following tabs will be made public to users via Adobe's Marketplace surfaces once your listing is published.

#### General Tab

- Public add-on name
- Subtitle
- Support email
- Help URL
- Description

#### Localizations Tab

Localized versions of:

- Public add-on name
- Subtitle
- Description

#### Media Tab

- 3 add-on icon sizes

#### Tags Tab

- Categories
- Custom Tags

#### Services Tab

- Privacy policy
- Terms of service
- Commerce: purchase method (paid or free)

### add-on Version Details

Here you will provide add-on level details for each add-on version submitted.

The information you add in the following tabs will be made public to users via Adobe's Marketplace surfaces once your version is published.

#### General Tab

- add-on package file (see the [section below](#add-on-package))
- If your add-on requires another application
- If your add-on requires a 3rd party service
- add-on UI supported languages
- Release notes

#### Localizations Tab

Localized versions of:

- Release notes

#### Media Tab

- Screenshots
- Videos

#### Add-on package

As part of your submission, you will upload your add-on package. Take the following steps to create your add-on package.

1. Compress your add-on files as a **.zip** file

   - Select all files within your add-on's parent folder. On both macOS and Windows you can right-click to compress:

     **macOS**:
     Right-click > Compress items

     **Windows**:
     Right-click > Send to > Compressed (zipped) folder

     **Note:** You should _not_ compress the add-on's parent folder. Instead, compress the contents of the parent folder. Failure to do so will likely cause a rejection when submitting.

2. Rename the **.zip** extension to **.xdx** or **.ccx** depending on the target host app.

   - Adobe XD recognizes the **.xdx** file extension as an **XD** add-on and Photoshop recognizes the **.ccx** as a **Photoshop** add-on.

   - By using this file extension, your add-on automatically gets the "double-click to install" feature, meaning that if you share your add-on directly to users, all they have to do is double-click to install the add-on.

3. Verify the packaging worked:

   - Double-click your final add-on package file. When your OS prompts you to install the add-on, click "Install".

   - Verify you see a success message upon installation and your add-on available in the host app.
