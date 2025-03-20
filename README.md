# Adobe Express Add-on Documentation

This repo contains all of the guides and references for Adobe Express add-on developers, hosted at https://developer.adobe.com/express/add-ons/docs/guides/.

## Document API References - Manual Formatting Steps

This section outlines the steps that should be taken to format the generated Document API references from Horizon into a Gatsby-friendly format.

**TIP:** it's easiest to open just the `editor` folder in VS Code (or your favorite editor) so you can globally search and replace in only those files to avoid unintentional mistakes. (Or set the advanced search settings to exclude everything else).

**Recommended pre-req:** Install [this extension](https://marketplace.visualstudio.com/items?itemName=jakearl.search-editor-apply-changes) in VS Code to make it easier to apply transformations across many files.

1. **Search** and **Replace** again across files to change the auto-generated HLAPI docs headings from `@hz/add-on-hz-hlapi-sdk` –> to `@express-document-sdk`.

2. The heading in the generated `classes`, `enumerations`, `interfaces`, `namespaces`, and `type-aliases` is not required. So, find and remove all occurrences of:

    ```md
    [**@express-document-sdk**](../overview.md) • **Docs**

    ---
    ```

3. The API signatures generated in `classes`, `enumerations`, `interfaces`, `namespaces`, and `type-aliases` is indented. In these directories, find and replace all occurrences of `newline + > + space` with `newline + • + space`, ensuring no code example or closing tag is replaced.

4. Find and replace all \`mat2d\` --> \[\`mat2d\`\]\(https://glmatrix.net/docs/module-mat2d.html)

5. Fix any `[iterator]` links to remove the brackets from the link references to ensure they work. For instance: `ArtboardList.md#%5Biterator%5D` should be `ArtboardList.md#iterator`. To fix, use Search again with a regex string of `.md#%5Biterator%5D` and replace with `.md#iterator`.

6. Find and remove all occurrences of `TemplatizedProxyLiveObject`. An example is of `ReadOnlyItemList.md`, where you should remove the following section:

    ```md
    ## Extends

    -   `TemplatizedProxyLiveObject`<`HzApiInputType`\>
    ```

7. Find and remove all occurrences of `ProxyLiveObject`. An example is of `BaseNode.md`, where you should remove the following section:

    ```md
    ## Extends

    -   `ProxyLiveObject`
    ```

8. Add a blank line after any `InlineAlert` in the Enums to render them properly. _(This can be easily fixed in the hz repo)_

9. Ensure any lists are surrounded by one blank line so the linter in the PR job doesn't complain. See **Context**, **Editor** classes specifically such as the `makeStroke` method which has a list. (Note: you can check the PR validation job to see if you missed any). _(This can be easily fixed in the hz repo)_

10. Find and replace `\<` with `<` for all `.md` files.

11. Find and replace "\n`Experimental`\n" with "" with a regex option turned on in VS Code for all `.md` files. This will remove the additional `Experimental` text from the generated docs.

## DevDocs Info

### How to set navigation
- Create a directory hierarchy in `src/pages/config.md`

### Local development
- This is not possible at the moment (we're still working on it)

### Launching a deploy
- Go to Actions > Deployment > Run workflow

### URL
- developer-stage.adobe.com/{path-prefix}/{relative-path-to-file}

### Where to ask for help

The slack channel #adobe-developer-website is our main point of contact for help. Feel free to join the channel and ask any questions.
