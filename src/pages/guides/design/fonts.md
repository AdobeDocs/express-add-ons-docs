# Using Fonts in Add-ons

## Adobe Fonts

The following Adobe Express fonts are injected into the add-on and can be used automatically.

```js
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/c0160f/00000000000000007735dac8/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3') format('woff2'), url('https://use.typekit.net/af/c0160f/00000000000000007735dac8/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3') format('woff'), url('https://use.typekit.net/af/c0160f/00000000000000007735dac8/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n4&v=3') format('opentype')",
    weight: "400",
    style: "normal",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/95bf80/00000000000000007735dacd/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=i4&v=3') format('woff2'), url('https://use.typekit.net/af/95bf80/00000000000000007735dacd/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=i4&v=3') format('woff'), url('https://use.typekit.net/af/95bf80/00000000000000007735dacd/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=i4&v=3') format('opentype')",
    weight: "400",
    style: "italic",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/5c07ba/00000000000000007735dad8/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3') format('woff2'), url('https://use.typekit.net/af/5c07ba/00000000000000007735dad8/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3') format('woff'), url('https://use.typekit.net/af/5c07ba/00000000000000007735dad8/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n7&v=3') format('opentype')",
    weight: "700",
    style: "normal",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/2dda0a/00000000000000007735dad4/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n8&v=3') format('woff2'), url('https://use.typekit.net/af/2dda0a/00000000000000007735dad4/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n8&v=3') format('woff'), url('https://use.typekit.net/af/2dda0a/00000000000000007735dad4/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n8&v=3') format('opentype')",
    weight: "800",
    style: "normal",
    display: "auto"
},
{
    family: "adobe-clean",
    source: "url('https://use.typekit.net/af/bc79c1/00000000000000007735dad9/30/l?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n9&v=3') format('woff2'), url('https://use.typekit.net/af/bc79c1/00000000000000007735dad9/30/d?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n9&v=3') format('woff'), url('https://use.typekit.net/af/bc79c1/00000000000000007735dad9/30/a?primer=f592e0a4b9356877842506ce344308576437e4f677d7c9b78ca2162e6cad991a&fvd=n9&v=3') format('opentype')",
    weight: "900",
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
