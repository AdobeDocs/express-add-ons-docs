# Using Fonts in Add-ons

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

### Import with font-face
This assumes your font is hosted on a server. 

  ```css
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans Regular'), local('OpenSans-Regular'), url('/fonts/OpenSans-Regular.ttf') format('truetype');
}

/* Use the font in your CSS */
body {
  font-family: 'Open Sans', sans-serif;
}