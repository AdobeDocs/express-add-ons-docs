"use strict";(self.webpackChunkdev_site_documentation_template=self.webpackChunkdev_site_documentation_template||[]).push([[7571],{72151:function(e,t,n){n.r(t),n.d(t,{_frontmatter:function(){return d},default:function(){return h}});var a=n(58168),s=n(80045),r=(n(88763),n(15680)),o=n(83407);const l=["components"],d={},i=(p="InlineAlert",function(e){return console.warn("Component "+p+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)});var p;const m={_frontmatter:d},c=o.A;function h(e){let{components:t}=e,n=(0,s.A)(e,l);return(0,r.mdx)(c,(0,a.A)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"use-text"},"Use Text"),(0,r.mdx)("p",null,"Text is an essential part of any design. Let's explore how to use all the available APIs to create and style it."),(0,r.mdx)("h2",{id:"create-text"},"Create Text"),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"editor.createText()")," method doesn't accept any parameters and returns a brand new ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextNode.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"TextNode")),". The actual textual content starts as empty and is found in its ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text"},(0,r.mdx)("inlineCode",{parentName:"a"},"fullContent.text"))," property."),(0,r.mdx)("h3",{id:"example"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Create a new TextNode\nconst textNode = editor.createText();\n\n// Set the text content\ntextNode.fullContent.text = "Hello,\\nWorld!";\n\n// Center the text on the page\nconst insertionParent = editor.context.insertionParent;\ntextNode.setPositionInParent(\n  { x: insertionParent.width / 2, y: insertionParent.height / 2 },\n  { x: 0, y: 0 }\n);\n\n// Add the TextNode to the document\ninsertionParent.children.append(textNode);\n\n// Get the text content\nconsole.log("Text: ", textNode.fullContent.text);\n')),(0,r.mdx)("p",null,"The text is created with the default styles (Source Sans 3, 100pt, black). Use ",(0,r.mdx)("inlineCode",{parentName:"p"},"\\n")," or ",(0,r.mdx)("inlineCode",{parentName:"p"},"\\r")," to add a line break."),(0,r.mdx)("h2",{id:"replace-text"},"Replace Text"),(0,r.mdx)("p",null,"The text content of a ",(0,r.mdx)("inlineCode",{parentName:"p"},"TextNode")," can be replaced by setting the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#text"},(0,r.mdx)("inlineCode",{parentName:"a"},"fullContent.text"))," property."),(0,r.mdx)("h3",{id:"example-1"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst selectedTextNode = editor.context.selection[0];\nselectedTextNode.fullContent.text = "Something else";\n')),(0,r.mdx)("h2",{id:"apply-character-styles"},"Apply Character Styles"),(0,r.mdx)("p",null,"Text styles can be applied to a ",(0,r.mdx)("inlineCode",{parentName:"p"},"TextNode")," using the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applycharacterstyles"},(0,r.mdx)("inlineCode",{parentName:"a"},"fullContent.applyCharacterStyles()"))," method, which applies one or more styles to the characters in the given range, leaving any style properties that were not specified unchanged."),(0,r.mdx)("p",null,"The styles are defined by the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/interfaces/CharacterStylesInput.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"CharacterStylesInput"))," interface; the properties that can be set are:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},"color"),(0,r.mdx)("li",{parentName:"ul"},"font (please see the ",(0,r.mdx)("a",{parentName:"li",href:"#use-fonts"},"Use Fonts")," section)"),(0,r.mdx)("li",{parentName:"ul"},"fontSize"),(0,r.mdx)("li",{parentName:"ul"},"letterSpacing"),(0,r.mdx)("li",{parentName:"ul"},"underline")),(0,r.mdx)("p",null,"The range is an object with the ",(0,r.mdx)("inlineCode",{parentName:"p"},"start")," and ",(0,r.mdx)("inlineCode",{parentName:"p"},"length")," properties."),(0,r.mdx)(i,{slots:"header, text",variant:"warning",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Style Ranges and Text edits"),(0,r.mdx)("p",null,"For the moment, replacing the ",(0,r.mdx)("inlineCode",{parentName:"p"},"fullContent.text")," will result in applying the style from the first range to the whole text. This behavior is subject to change in future releases."),(0,r.mdx)("p",null,"Please note that ",(0,r.mdx)("inlineCode",{parentName:"p"},"applyCharacterStyles()")," is only one way to set styles; you can also use the ",(0,r.mdx)("inlineCode",{parentName:"p"},"characterStyleRanges")," property, which supports both getting and setting styles, as described ",(0,r.mdx)("a",{parentName:"p",href:"#example-set-all-styles"},"here"),"."),(0,r.mdx)("h3",{id:"example-set-styles-in-a-range"},"Example: Set Styles in a range"),(0,r.mdx)("p",null,"Let's change the styles for the first three characters of a TextNode."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\n\n// Apply character styles to the first three letters\ntextNode.fullContent.applyCharacterStyles(\n  {\n    color: { red: 0, green: 0.4, blue: 0.8, alpha: 1 },\n    fontSize: 240,\n    letterSpacing: 10,\n    underline: true,\n  },\n  {\n    start: 0,\n    length: 3,\n  }\n);\n')),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"applyCharacterStyles()")," method is not the only one that allows you to set styles; you can also use the ",(0,r.mdx)("inlineCode",{parentName:"p"},"characterStyleRanges")," property, which supports both getting and setting styles."),(0,r.mdx)("h3",{id:"example-get-all-styles"},"Example: Get all Styles"),(0,r.mdx)("p",null,"To get the complete list of text character styles, you can use the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges"},(0,r.mdx)("inlineCode",{parentName:"a"},"fullContent.characterStyleRanges"))," property, which returns an array of ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/interfaces/CharacterStylesRange.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"CharacterStylesRange"))," elements."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\nconst contentModel = textNode.fullContent;\n\n// Get the array of character styles\nconst existingStyles = contentModel.characterStyleRanges;\n\n// Edit some properties\nexistingStyles[0].fontSize = 10;\n\n// Reassign the array to apply the style changes\ncontentModel.characterStyleRanges = existingStyles;\n')),(0,r.mdx)("h3",{id:"example-set-all-styles"},"Example: Set all Styles"),(0,r.mdx)("p",null,"You can also use the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges"},(0,r.mdx)("inlineCode",{parentName:"a"},"characterStyleRanges"))," property to set individual ranges or them all. It's always best to get the array, modify it, and then reassign it."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\nconst contentModel = textNode.fullContent;\n\n// Get the array of character styles\nconst existingStyles = contentModel.characterStyleRanges;\n\n// Edit some properties: the font size of all styles\nexistingStyles.forEach((style) => {\n  style.fontSize = 50;\n});\n// Alternatively, you could set the properties for a specific style range\n// existingStyles[0].fontSize = 50;\n\n// Reassign the array to apply the style changes\ncontentModel.characterStyleRanges = existingStyles;\n')),(0,r.mdx)("h3",{id:"example-reapply-styles"},"Example: Reapply Styles"),(0,r.mdx)("p",null,"In the current release, automatic preservation of the Character Style configuration is not available when editing a TextNode’s content via the ",(0,r.mdx)("inlineCode",{parentName:"p"},"fullContent.text"),". As a temporary solution, you can save the existing character style ranges before updating the text and reapply them afterward to maintain your custom styles."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\nconst contentModel = textNode.fullContent;\n\n// Save existing character style ranges\nconst savedStyles = contentModel.characterStyleRanges;\n\n// Replace the text content\ncontentModel.text = "Updated text content\\nwith preserved styles";\n\n// Reapply the saved character styles\ncontentModel.characterStyleRanges = savedStyles;\n')),(0,r.mdx)(i,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"If the text content differs too much from the original, the character style ranges might not be reapplied correctly. This is a temporary solution until automatic preservation of character styles is available."),(0,r.mdx)("h2",{id:"use-fonts"},"Use Fonts"),(0,r.mdx)("p",null,"In the Adobe Express Document API, Fonts are part of the Character Styles; we're treating them separately here for clarity. Similarly to the color and other properties, you can use individual ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/interfaces/CharacterStylesRange.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"CharacterStylesRange"))," items from the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#characterstyleranges"},(0,r.mdx)("inlineCode",{parentName:"a"},"CharacterStyleRanges"))," array as Font getters and setters, or use the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applycharacterstyles"},(0,r.mdx)("inlineCode",{parentName:"a"},"applyCharacterStyles()"))," method to apply a Font style to a specific range."),(0,r.mdx)("p",null,"The only caveat is that you cannot set the font as an Object literal, like, e.g., colors; fonts must be of type ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/AvailableFont.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"AvailableFont")),", and are instantiated from the ",(0,r.mdx)("inlineCode",{parentName:"p"},"fonts")," object (imported from the ",(0,r.mdx)("inlineCode",{parentName:"p"},'"express-document-sdk"'),") using the asynchronous ",(0,r.mdx)("inlineCode",{parentName:"p"},"fromPostscriptName()")," method."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// Always\n✅ const font = await fonts.fromPostscriptName("SourceSans3-Bold");\n\n// Won\'t work\n❌ const font = {\n  availableForEditing: true,\n  isPremium: false,\n  family: "Source Sans 3",\n  postscriptName: "SourceSans3-Bold",\n  style: "Bold",\n}\n')),(0,r.mdx)("p",null,"You can get PostScript names by setting different text fonts in the Adobe Express UI; then, log and inspec the ",(0,r.mdx)("inlineCode",{parentName:"p"},"font")," property of ",(0,r.mdx)("inlineCode",{parentName:"p"},"characterStyleRange"),", as seen ",(0,r.mdx)("a",{parentName:"p",href:"#example-get-all-styles"},"here"),"."),(0,r.mdx)(i,{slots:"text",variant:"info",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Remember that the ",(0,r.mdx)("inlineCode",{parentName:"p"},"fromPostscriptName()")," method is ",(0,r.mdx)("strong",{parentName:"p"},"asynchronous"),". The promise resolves to an ",(0,r.mdx)("inlineCode",{parentName:"p"},"AvailableFont")," instance only for fonts that the user has permission to use for editing content; otherwise, it will resolve to ",(0,r.mdx)("inlineCode",{parentName:"p"},"undefined"),"."),(0,r.mdx)("h3",{id:"example-set-fonts-in-a-range"},"Example: Set Fonts in a range."),(0,r.mdx)("p",null,"Let's now change the font of the first three characters in a TextNode. Please note that although you're allowed to set the font as the only style, the font object itself must contain all the properties, as the following code snippet demonstrates."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor, fonts } from "express-document-sdk"; // 👈 fonts import\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\n\n// Getting a new font object\nconst lato = await fonts.fromPostscriptName("Lato-Light");\nif (!lato) return; // in case the user isn\'t entitled to use this font\n\n// ⚠️ Queueing the edit\neditor.queueAsyncEdit(() => {\n  textNode.fullContent.applyCharacterStyles(\n    { font: lato, fontSize: 24 },\n    { start: 0, length: 3 }\n  );\n});\n')),(0,r.mdx)(i,{slots:"header, text",variant:"warning",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Asynchronous operations"),(0,r.mdx)("p",null,"Queuing the ",(0,r.mdx)("inlineCode",{parentName:"p"},"applyCharacterStyles()")," method is necessary because ",(0,r.mdx)("inlineCode",{parentName:"p"},"fromPostscriptName()")," is asynchronous. This ensures the edit is properly tracked for saving and undo. You can read more about this in the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/Editor.md#queueasyncedit"},"queueAsyncEdit()")," reference."),(0,r.mdx)("h3",{id:"example-get-all-fonts"},"Example: Get all Fonts"),(0,r.mdx)("p",null,"A font, regardless of whether accessed via ",(0,r.mdx)("inlineCode",{parentName:"p"},"CharacterStylesRange")," or executing ",(0,r.mdx)("inlineCode",{parentName:"p"},"fromPostscriptName()"),", exposes the following properties:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"isPremium"),": boolean, indicating whether the font is a Premium Adobe font."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"availableForEditing"),": boolean, indicating whether the user has access or licensing permissions to create or edit content with this font."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"family"),": string, the font family name, as you would find in the Text panel's UI."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"postscriptName"),": string, the PostScript name of the font."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"style"),': string, the style of the font (e.g., "Regular", "Bold", "Italic").')),(0,r.mdx)("p",null,"You can log ",(0,r.mdx)("inlineCode",{parentName:"p"},"font")," and inspect it to find the actual PostScript name."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\nconst contentModel = textNode.fullContent;\n\n// Get the array of character styles\nconst existingStyles = contentModel.characterStyleRanges;\n\n// Log the font of the first style\nconsole.log(existingStyles[0].font);\n// {\n//   isPremium: false\n//   availableForEditing: true\n//   family: "Source Sans 3"\n//   postscriptName: "SourceSans3-Regular"\n//   style: "Regular"\n// }\n')),(0,r.mdx)("h3",{id:"example-set-all-fonts"},"Example: Set all Fonts"),(0,r.mdx)("p",null,"Similarly to what we've seen with ",(0,r.mdx)("a",{parentName:"p",href:"#example-set-all-styles"},"other styles"),", you can set the font in a range by reassigning the ",(0,r.mdx)("inlineCode",{parentName:"p"},"characterStyleRanges")," array."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor, fonts } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\nconst contentModel = textNode.fullContent;\n\nconst sourceSansBold = await fonts.fromPostscriptName("SourceSans3-Bold");\nif (!sourceSansBold) return;\n\n// Get the array of character styles\nconst existingStyles = contentModel.characterStyleRanges;\n\n// Set the font for all styles\nexistingStyles.forEach((style) => {\n  style.font = sourceSansBold;\n});\n// Alternatively, you could set the font for a specific style range\n// existingStyles[0].font = sourceSansBold;\n\n// Reassign the array to apply the style changes\neditor.queueAsyncEdit(() => {\n  contentModel.characterStyleRanges = existingStyles;\n});\n')),(0,r.mdx)(i,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Since we're dealing with asynchronous operations, we're queuing the edit to ensure it's properly tracked for saving and undo, as we did for ",(0,r.mdx)("a",{parentName:"p",href:"#example-set-all-styles"},"setting other styles")),(0,r.mdx)("h2",{id:"apply-paragraph-styles"},"Apply Paragraph Styles"),(0,r.mdx)("p",null,"Paragraph styles can be applied to a TextNode using the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#applyparagraphstyles"},(0,r.mdx)("inlineCode",{parentName:"a"},"fullContent.applyParagraphStyles()"))," method. This method applies one or more style properties to entire paragraphs within the specified range, while leaving any style properties that are not provided unchanged. In contrast to directly setting the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#paragraphstyleranges"},(0,r.mdx)("inlineCode",{parentName:"a"},"paragraphStyleRanges"))," property—which resets any unspecified properties to their defaults—using ",(0,r.mdx)("inlineCode",{parentName:"p"},"applyParagraphStyles()")," lets you update only the desired aspects of the style."),(0,r.mdx)("p",null,"The available properties are defined by the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/interfaces/ParagraphStylesInput.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"ParagraphStylesInput"))," interface and include:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"lineSpacing"),": Specifies the spacing between lines (leading), expressed as a multiple of the font’s default spacing (e.g. 1.5 means 150% of normal)."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"spaceBefore"),": Sets the space (in points) before a paragraph."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"spaceAfter"),": Sets the space (in points) after a paragraph."),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("strong",{parentName:"li"},"list"),": Configures list styles (ordered or unordered) for the paragraph. When specifying list styles, you provide the settings via either the ",(0,r.mdx)("a",{parentName:"li",href:"../../../references/document-sandbox/document-apis/interfaces/OrderedListStyleInput.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"OrderedListStyleInput"))," or ",(0,r.mdx)("a",{parentName:"li",href:"../../../references/document-sandbox/document-apis/interfaces/UnorderedListStyleInput.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"UnorderedListStyleInput"))," interface.")),(0,r.mdx)("p",null,"Paragraphs are defined by newline characters (",(0,r.mdx)("inlineCode",{parentName:"p"},"\\n"),"), so the style ranges should align with these boundaries. The method accepts an optional range—an object with ",(0,r.mdx)("inlineCode",{parentName:"p"},"start")," and ",(0,r.mdx)("inlineCode",{parentName:"p"},"length")," properties—that determines which portion of the text content will be updated. If no range is provided, the styles will be applied to the entire text content flow."),(0,r.mdx)(i,{slots:"header, text",variant:"warning",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"Style Ranges and Text Edits"),(0,r.mdx)("p",null,"For the moment, replacing the ",(0,r.mdx)("inlineCode",{parentName:"p"},"fullContent.text")," will result in applying the style from the first range to the whole text. This behavior is subject to change in future releases."),(0,r.mdx)("h3",{id:"example-set-styles-in-a-range-1"},"Example: Set Styles in a Range"),(0,r.mdx)("p",null,"In this example, we modify the styles for a specific paragraph (the first 20 characters) by updating the line spacing and adding an ordered list style."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor, constants } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\n\n// Apply paragraph styles to the specified range (e.g., the first paragraph)\ntextNode.fullContent.applyParagraphStyles(\n  {\n    lineSpacing: 1.5, // 150% of normal line spacing\n    spaceBefore: 12, // 12 points before the paragraph\n    spaceAfter: 8, // 8 points after the paragraph\n    list: {\n      type: constants.ParagraphListType.ordered,\n      numbering: constants.OrderedListNumbering.doubleZeroPrefixNumeric,\n      prefix: "",\n      postfix: ".",\n      indentLevel: 2, // Indent level for the list\n    },\n  },\n  {\n    start: 0,\n    length: 20,\n  }\n);\n')),(0,r.mdx)("h3",{id:"example-get-all-styles-1"},"Example: Get All Styles"),(0,r.mdx)("p",null,"To view the paragraph styles currently applied to a TextNode, you can access the ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#paragraphstyleranges"},(0,r.mdx)("inlineCode",{parentName:"a"},"fullContent.paragraphStyleRanges"))," property. This property returns an array of ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/interfaces/ParagraphStylesRange.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"ParagraphStylesRange"))," objects, each representing the style configuration for a contiguous block of text (i.e. a paragraph)."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\nconst contentModel = textNode.fullContent;\n\n// Retrieve and log the paragraph style ranges\nconst paragraphStyles = contentModel.paragraphStyleRanges;\nconsole.log("Paragraph Styles: ", paragraphStyles);\n')),(0,r.mdx)("h3",{id:"example-set-all-styles-1"},"Example: Set All Styles"),(0,r.mdx)("p",null,"You can also update paragraph styles for the entire text content by modifying the array returned by ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md#paragraphstyleranges"},(0,r.mdx)("inlineCode",{parentName:"a"},"paragraphStyleRanges")),". In this example, we update the ",(0,r.mdx)("inlineCode",{parentName:"p"},"spaceAfter")," property for all paragraphs."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\nconst contentModel = textNode.fullContent;\n\n// Get the current paragraph style ranges\nconst existingStyles = contentModel.paragraphStyleRanges;\n\n// Update each range (for instance, set spaceAfter to 10 points)\nexistingStyles.forEach((range) => {\n  range.spaceAfter = 10;\n});\n\n// Reassign the modified array to apply the changes\ncontentModel.paragraphStyleRanges = existingStyles;\n')),(0,r.mdx)("h3",{id:"example-reapply-styles-1"},"Example: Reapply Styles"),(0,r.mdx)("p",null,"When you update the text content, paragraph boundaries may change. To preserve your custom paragraph styles, save the current style ranges, modify the text, and then reapply the saved styles."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame\nconst textNode = editor.context.selection[0];\nconst contentModel = textNode.fullContent;\n\n// Save the current paragraph style ranges\nconst savedParagraphStyles = contentModel.paragraphStyleRanges;\n\n// Replace the text content\ncontentModel.text = "New text content\\nwith updated paragraphs";\n\n// Reapply the saved paragraph styles\ncontentModel.paragraphStyleRanges = savedParagraphStyles;\n')),(0,r.mdx)(i,{slots:"text",variant:"warning",mdxType:"InlineAlert"}),(0,r.mdx)("p",null,"If the updated text does not match the original paragraph boundaries, some styles may not be reapplied as expected. This is a temporary limitation until automatic preservation of paragraph styles is implemented."),(0,r.mdx)("h2",{id:"deal-with-text-flow"},"Deal with Text Flow"),(0,r.mdx)("p",null,'With the introduction of "Text Flow" in Adobe Express (allowing content to move freely between multiple text frames), the concept of a text node had to be separated from text content.'),(0,r.mdx)("p",null,"The ",(0,r.mdx)("inlineCode",{parentName:"p"},"fullContent")," property ",(0,r.mdx)("em",{parentName:"p"},"points to")," a ",(0,r.mdx)("a",{parentName:"p",href:"../../../references/document-sandbox/document-apis/classes/TextContentModel.md"},(0,r.mdx)("inlineCode",{parentName:"a"},"TextContentModel"))," object, which contains the actual text content that multiple ",(0,r.mdx)("inlineCode",{parentName:"p"},"TextNode")," instances can share."),(0,r.mdx)("h3",{id:"example-2"},"Example"),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-js"},'// sandbox/code.js\nimport { editor } from "express-document-sdk";\n\n// Assuming the user has selected a text frame that contains\n// text spanning to multiple text nodes\nconst selectedTextNode = editor.context.selection[0];\n\n// Log all the text nodes that share the same TextContentModel\nfor (const textNode of selectedTextNode.fullContent.allTextNodes) {\n  console.log(textNode);\n}\n')))}h.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-guides-develop-how-to-use-text-md-84ac43447fec2e5920e3.js.map