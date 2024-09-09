# Adobe Express Add-on Documentation

This repo contains all of the guides and references for Adobe Express add-on developers, hosted at https://developer.adobe.com/express/add-ons/docs/guides/.

## Document API References - Manual Formatting Steps

This section outlines the steps that should be taken to format the generated Document API references from Horizon into a Gatsby-friendly format.

**TIP:** it's easiest to open just the `editor` folder in VS Code (or your favorite editor) so you can globally search and replace in only those files to avoid unintentional mistakes. (Or set the advanced search settings to exclude everything else).

**Recommended pre-req:** Install [this extension](https://marketplace.visualstudio.com/items?itemName=jakearl.search-editor-apply-changes) in VS Code to make it easier to apply transformations across many files.

1. **Search** and **Replace** again across files to change the auto-generated HLAPI docs headings from `@express-document-sdk` –> to `@express-document-sdk`.

2. Replace all \`mat2d\` --> \[\`mat2d\`\]\(https://glmatrix.net/docs/module-mat2d.html\)

3. Fix any `[iterator]` links to remove the brackets from the link references to ensure they work. For instance: `ArtboardList.md#%5Biterator%5D` should be `ArtboardList.md#iterator`. To fix, use Search again with a regex string of `.md#%5Biterator%5D` and replace with `.md#iterator`.

4. Find and remove all ocurrences of `TemplatizedProxyLiveObject`. An example is of `ReadOnlyItemList.md`, where you should remove the following section:

    ```md
    ## Extends

    -   `TemplatizedProxyLiveObject`<`HzApiInputType`\>
    ```

5. Find and remove all ocurrences of `ProxyLiveObject`. An example is of `BaseNode.md`, where you should remove the following section:

    ```md
    ## Extends

    -   `ProxyLiveObject`
    ```

6. Add a blank line after any `InlineAlert` in the Enums to render them properly. _(This can be easily fixed in the hz repo)_

7. Ensure any lists are surrounded by one blank line so the linter in the PR job doesn't complain. See **Context**, **Editor** classes specifically such as the `makeStroke` method which has a list. (Note: you can check the PR validation job to see if you missed any). _(This can be easily fixed in the hz repo)_

8. Find and replace `\<` with `<` for all `.md` files.

## Adobe I/O Documentation Template Info

This is a site template built with the [Adobe I/O Theme](https://github.com/adobe/aio-theme).

View the [demo](https://adobedocs.github.io/dev-site-documentation-template/) running on Github Pages.

## Where to ask for help

The slack channel #adobe-developer-website is our main point of contact for help. Feel free to join the channel and ask any questions.

## How to develop

For local development, simply use :

```shell
$ yarn install
$ yarn dev
```

For the developer documentation, read the following sections on how to:

-   [Arrange the structure content of your docs](https://github.com/adobe/aio-theme#content-structure)
-   [Link to pages](https://github.com/adobe/aio-theme#links)
-   [Use assets](https://github.com/adobe/aio-theme#assets)
-   [Set global Navigation](https://github.com/adobe/aio-theme#global-navigation)
-   [Set side navigation](https://github.com/adobe/aio-theme#side-navigation)
-   [Use content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
-   [Use Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)

For more in-depth [instructions](https://github.com/adobe/aio-theme#getting-started).

## How to test

-   To run the configured linters locally (requires [Docker](https://www.docker.com/)):

    ```shell
    yarn lint
    ```

    > NOTE If you cannot use Docker, you can install the linters separately. In `.github/super-linter.env`, see which linters are enabled, and find the tools being used for linting in [Supported Linters](https://github.com/github/super-linter#supported-linters).

-   To check internal links locally

    ```shell
    yarn test:links
    ```

-   To build and preview locally:

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
