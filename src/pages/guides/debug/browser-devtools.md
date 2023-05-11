# Browser Developer Tools

You can use the built-in developer tools of your browser to do in-depth debugging while your add-on is loaded and running, including setting breakpoints and stepping through your code, and logging messages to the console. An example of debugging with the browser developer tools is shown in the video below:

<iframe aria-label="Browser Debugging Demo" src="https://drive.google.com/file/d/13FHUuRpVti9AH4nUwAMcvNcP6OzGpOc1/preview" width="640" height="480"></iframe>


## Console Messages

You can also log messages from different places in your code with certain severity levels to help you filter what you're looking for further when you're looking in the developer tools console. However, since the browser is running many other things into the same page, you will see a lot of messages in the console. A good practice is to use some identifier in your messages and filter the message that way. For instance, each `console.*` method represents severity level, such as `Info`, `Warning`, `Error`, `Verbose`. Some examples are below, and you can see [this link](https://developer.chrome.com/docs/devtools/console/api/) for more details:

```
    console.log('Info level)
    console.warn('Warning level')
    console.error('Error level)
    console.debug(Verbose level)
```

You can also specifically set which levels you want to view in the developer tools with the **Custom levels** drop-down as well to help you find your specific messages more quickly:

![custom levels](./img/log-levels.png)

### Printing JSON Data

Another useful console method is the `.dir()` which prints a JSON representation of the object, such as `console.dir(document.head);` which would produce the following:

![console.dir method](./img/dir-method.png)

<InlineAlert slots="text" variant="info"/>

This is an area where we are currently exploring and collecting feedback.
