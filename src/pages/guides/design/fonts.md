# Using Fonts in Add-ons

## Adobe Fonts
The following Adobe Express fonts are injected into the add-on and can be used automatically. 

```js
 {
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/b0c5f5/00000000000000003b9b3f85/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3') format('woff2'), url('https://use.typekit.net/af/b0c5f5/00000000000000003b9b3f85/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3') format('woff'), url(https://use.typekit.net/af/b0c5f5/00000000000000003b9b3f85/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3) format('opentype')",
    weight: "400",
    style: "normal",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/97fbd1/00000000000000003b9b3f88/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff2'), url('https://use.typekit.net/af/97fbd1/00000000000000003b9b3f88/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff'), url('https://use.typekit.net/af/97fbd1/00000000000000003b9b3f88/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('opentype')",
    weight: "700",
    style: "normal",
    display: "auto"
}
```

<InlineAlert slots="text" variant="info"/>

In the near future, all of the Adobe Express fonts will be injected for use, however, at the moment these specific fonts are being injected for you to access in your add-on without having to bundle them.

## Importing Fonts from a URL
You can use a font with a URL by either linking to it via an import rule, via the &lt;link&gt; tag, or `font-face`.


<InlineAlert slots="text" variant="success"/>

### Import with the &lt;import&gt; tag:
```html
<style>
            @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
            * {
                font-family: "Poppins", sans-serif;
                margin: 0;
                padding: 0;
            }
</style>
```

or 

### Import with the &lt;link&gt; tag:

```html
<head>
    <meta charset="utf-8">
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Tangerine">
    <style>
      body {
        font-family: 'Tangerine', serif;
        font-size: 48px;
      }
    </style>
  </head>
  ```