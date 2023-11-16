# Adobe Express Add-on Documentation

This repo contains all of the guides and references for Adobe Express add-on developers, hosted at https://developer.adobe.com/express/add-ons/docs/guides/.

## Document API References - Manual Formatting Steps

This section outlines the steps that should be taken to format the generated Document API references from Horizon into a Gatsby-friendly format. 

**TIP:** it's easiest to open just the `editor` folder in VS Code (or your favorite editor) so you can globally search and replace in only those files to avoid unintentional mistakes. (Or set the advanced search settings to exclude everything else).

**Recommended pre-req:** Install [this extension](https://marketplace.visualstudio.com/items?itemName=jakearl.search-editor-apply-changes) in VS Code to make it easier to apply transformations across many files.

1. Remove the links in the generated headers. For example: 

    `### <a id="createEllipse" name="createEllipse"></a> createEllipse`

    to:

    `### createEllipse`

   In the **Search** box (magnifying glass in left rail), select the regex option (`.*` option in VS Code) with search string of `<a .*?.*?></a> ` and the **Replace** box empty (so it just removes it). **Note:** Be sure to include the space after the the closing tag so it doesn't leave an extra space in the heading.

2. Search and Replace again across files to change the auto-generated HLAPI docs headings from `@add-on-hlapi-sdk` –> to `@express-document-sdk` with 

3. Transform all **Table of Contents** links to lowercase so they match the way Gatsby generates internal links from the headers in all lowercase (ie: `PageNode.md#allChildren` to `PageNode.md#allchildren`). 

   You can transform them all at once by following the steps below:

   - In the **Search** box (magnifying glass in left rail), select the regex option (`.*` option in VS Code) with search string of `.md#*[a-z]+(?:[A-Z0-9]+[a-z0-9]+[A-Za-z0-9]*)*`.
   - Click the **“Open in editor”** link under the global Search and Replace boxes, and all the matches will be shown together in one editor window so you can make changes to them all at once. Click into the open editor window where they're shown and then choose **Select all occurrences** (or **Shift+Command+L**) from the **Selection** menu, while ensuring you have the regex string above still in the Search box, to actually select the highlighted items.
   - Open the **Command Palette** from the **View->Command Palette** top menu (or **Shift+Cmd+P**) and type **lower**, then choose **Transform to lowercase**. This will ensure all camelCase links become lowercased.
   - **Note:** this step requires [the extension](https://marketplace.visualstudio.com/items?itemName=jakearl.search-editor-apply-changes) mentioned in the pre-reqs. Apply the changes from the editor back to the workspace with the Command Palette **Apply Search Editor changes to workspace** (which will be available once the extension is installed). 

4. Fix any `[iterator]` links to remove the brackets from the link references to ensure they work. For instance: `ArtboardList.md#[iterator]` should be `ArtboardList.md#iterator`. To fix, use Search again with a regex string of `.md#\[iterator\]` and replace with `.md#iterator`.
5. Add a blank line after any `InlineAlerts` in the Enums to render them properly. *(This can be easily fixed in the hz repo)*
6. Ensure any lists are be surrounded by one blank line so the linter in the PR job doesn't complain. See **Context**, **Editor** classes specifically such as the `createStroke` method which has a list. (Note: you can check the PR validation job to see if you missed any). *(This can be easily fixed in the hz repo)*

## Adobe I/O Documentation Template Info

This is a site template built with the [Adobe I/O Theme](https://github.com/adobe/aio-theme).

View the [demo](https://adobedocs.github.io/dev-site-documentation-template/) running on Github Pages.  

## Where to ask for help

The slack channel #adobeio-onsite-onboarding is our main point of contact for help. Feel free to join the channel and ask any questions.

## How to develop

For local development, simply use :

```shell
$ yarn install
$ yarn dev
```

For the developer documentation, read the following sections on how to:

- [Arrange the structure content of your docs](https://github.com/adobe/aio-theme#content-structure)
- [Link to pages](https://github.com/adobe/aio-theme#links)
- [Use assets](https://github.com/adobe/aio-theme#assets)
- [Set global Navigation](https://github.com/adobe/aio-theme#global-navigation)
- [Set side navigation](https://github.com/adobe/aio-theme#side-navigation)
- [Use content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
- [Use Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)

For more in-depth [instructions](https://github.com/adobe/aio-theme#getting-started).

## How to test

- To run the configured linters locally (requires [Docker](https://www.docker.com/)):

  ```shell
  yarn lint
  ```

  > NOTE If you cannot use Docker, you can install the linters separately. In `.github/super-linter.env`, see which linters are enabled, and find the tools being used for linting in [Supported Linters](https://github.com/github/super-linter#supported-linters).

- To check internal links locally

  ```shell
  yarn test:links
  ```

- To build and preview locally:

  ```shell
  yarn start
  ```

## How to deploy

For any team that wishes to deploy to the developer.adobe.com and developer-stage.adobe.com websites, they must be in contact with the dev-site team. Teams will be given a path that will follow the pattern `developer.adobe.com/{product}/`. This will allow doc developers to setup their subpaths to look something like:

```text
developer.adobe.com/{product}/docs
developer.adobe.com/{product}/community
developer.adobe.com/{product}/community/code_of_conduct
developer.adobe.com/{product}/community/contribute
```

### Launching a deploy

You can deploy using the GitHub actions deploy workflow see [deploy instructions](https://github.com/adobe/aio-theme#deploy-to-azure-storage-static-websites).
