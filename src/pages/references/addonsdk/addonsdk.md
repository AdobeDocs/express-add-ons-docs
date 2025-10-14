# addOnUISdk

The core add-on UI SDK object which provides access to everything needed for add-on development. This includes determining the current version of the platform, an object to use for determining when the SDK has been initialized and ready for use, and other core objects you can use to access specific features you may want to use for building your add-on.

## addOnUISdk Properties

&lt;table class="spectrum-Table spectrum-Table--sizeM" css="
    background-color:lavender;
    tbody {
      background-color:white;
    }">
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-headCell">&lt;p&gt;&lt;strong&gt;Attribute&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-headCell">&lt;p&gt;&lt;strong&gt;Name&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-headCell">&lt;p&gt;&lt;strong&gt;Type&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-headCell">&lt;p&gt;&lt;strong&gt;Description&lt;/strong&gt;&lt;/p&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tbody class="spectrum-Table-body">
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;readonly&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;addOnUISdk.apiVersion&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;string&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;Current version of the add-on SDK running.&lt;/p&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;readonly&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;addOnUISdk.app&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;object&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;Provides access to the host application (Adobe Express)&lt;/p&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;addOnUISdk.constants&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;object&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;A set of constants used throughout the add-on SDK.&lt;/p&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;readonly&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;addOnUISdk.instance&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;object&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;The currently running add-on instance.&lt;/p&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr class="spectrum-Table-row">
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;readonly&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;AddOnSdk.ready&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;&lt;pre&gt;Promise&lt;/pre&gt;&lt;/p&gt;&lt;/td&gt;
    &lt;td class="spectrum-Table-cell">&lt;p&gt;Indicates the addOnUISdk object has been initialized and you can start accessing the APIs. Register a call back with [Promise.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) or [await this promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).&lt;/p&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;

&lt;!-- ## Methods

## ready
Asynchronous

## Example Usage:
await AddOnSdk.ready; --&gt;