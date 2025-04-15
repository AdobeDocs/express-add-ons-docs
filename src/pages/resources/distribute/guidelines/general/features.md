# Features

Some elements to bear in mind when testing the features of your add-on before submission.

## Stability

Make sure the add-on does not crash Adobe Express, and operates consistently without stability issues.

## Storing user data

Your add-on should only store necessary information on the user’s machine. If it stores a lot of data, it must be able to handle any errors that arise from exceeding storage quotas.

## Loading indicators

When loading takes a noticeable amount of time, a loading indicator should be displayed to provide visual feedback. If an operation takes a considerable amount of time and blocks the use of the add-on or Adobe Express, the add-on should provide an affordance that allows the user to cancel the operation.

## Generating renditions

Where the add-on generates renditions of user content, it must provide some sort of progress indicator.

This reassures the user that the process is ongoing, and that the add-on has not simply stopped responding.

## Text boxes

Any text boxes must support English characters, numbers and special characters as expected.

## Importing images and videos

Your add-on must be able to smoothly import any media required for design or operation.

## “Drag and Drop” functionality

If the add-on allows users to add content to the document, it should support drag and drop functionality. This allows users to select an image from the add-on and drop it in the desired location in a document.

## “Single-click to Add” functionality

Any add-on where content can be added to a document should also support the option to add an image with a single click. This means that users can click on the desired location to integrate an image.

## Support for both options above

You are encouraged to support both “Single-click to Add” and “Drag and Drop” functionality wherever possible. There may be some exceptions in cases where “Drag and Drop” is technically not feasible. If “Drag and Drop” is not supported, ensure that you communicate this to the user to avoid confusion.

## Navigation

The user must be able to navigate through all menus and screens, without feeling “stuck”. If they find themselves on the wrong screen, they should be able to navigate out (for example, using a “back” or “menu” button).

## Online-offline-online

If the user’s internet connection drops out during use, the add-on must be able to resume normal operation after reconnecting.

This means:

- The reconnection process should occur seamlessly and gracefully.
- The transition from online to offline and online again should not break the add-on in any way.
- If the add-on does fail to work for whatever reason, an appropriate error message should be displayed.
- When the user is offline, the add-on should not affect the performance or stability of the application.
