# Web APIs
The Web APIs refer to the set of commonly used APIs that are injected by the script runtime into the global context to allow you to access common JavaScript functions. 

## Overview
The Web APIs provide implementations of some common objects and functions for you to use in your script code to perform things like logging to the console and setting timeouts and intervals. They are limited to a set of basic functions currently, as outlined in the next section. Most of the browsers APIs/Global Objects are not available in Script Runtime. For these, the developers can use iframe runtime environment and [communicate](./communication/#expose-apis-from-the-ui) the result back to the script running inside script runtime environment.

<InlineAlert slots="text" variant="success"/>

These APIs can automatically be used in your script runtime code.

## Console Object
A global [`console`](https://developer.mozilla.org/en-US/docs/Web/API/console) object implementation is provided with the following JavaScript method implementations for use in your script code.

### console.log()
For general output of logging information. You may use string substitution and additional arguments with this method.

### console.info()
Informative logging of information. You may use string substitution and additional arguments with this method.

### console.warn()
Outputs a warning message. You may use string substitution and additional arguments with this method.

### console.error()
Outputs an error message. You may use string substitution and additional arguments with this method.

### console.debug()
Outputs a message to the console with the log level debug.

### console.clear()
Clear the console.

### console.assert()
Log a message and stack trace to console if the first argument is false.

## Additional Methods
### setTimeout()
An implementation of the [JavaScript `setTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) method that sets a timer to execute a function or specified piece of code once the timer expires.

#### Signature
`setTimeout(functionRef: Function, delay: number, ...params: any[]): number`

#### Parameters
| Name          | Type        | Description   |
| --------------| ------------| -----------:  |
| `functionRef` | `function` | A function to be executed after the timer expires. |                 
| `delay`       | `number`   | The time, in milliseconds, that the timer should wait before the specified function or code is executed. If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.        |
| `params`      | `any []`   | Additional arguments which are passed through to the function specified by `functionRef`.                    |

#### Returns 
A positive integer representing an identifier for the timeout function(aka: `timeoutID`), which can be passed to `clearTimeout()` to cancel the timeout.

**Note:** It's guaranteed that a `timeoutID` value will never be reused by a subsequent call to `setTimeout()` or `setInterval()` on the same object (a window or a worker). 

### clearTimeout()
The [`clearTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) method implementation cancels a timeout previously established by calling `setTimeout()`. If the parameter provided does not identify a previously established action, this method does nothing.

#### Signature
`clearTimeout(timeoutID: number): void`

#### Parameters
| Name          | Type        | Description   |
| --------------| ------------| -----------:  |
| `timeoutID` | `number` | The identifier of the timeout you want to cancel. This ID was returned by the corresponding call to `setTimeout()`. |       

#### Returns
None (`undefined`).

### setInterval()
The [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) method repeatedly calls a function or executes a code snippet, with a fixed time delay between each call. This method returns an interval ID which uniquely identifies the interval, so you can remove it later by calling `clearInterval()`.

#### Signature
`setInterval(functionRef: Function, delay: number, ...params: any[]): number`

#### Parameters
| Name          | Type        | Description   |
| --------------| ------------| -----------:  |
| `functionRef`  | `function` | A function to be executed every delay milliseconds. The first execution happens after delay milliseconds. |       
| `delay`       | `number`   | The time, in milliseconds (thousandths of a second), the timer should delay in between executions of the specified function or code. Defaults to 0 if not specified.   |
| `params`      | `any []`   | Additional arguments which are passed through to the function specified by func once the timer expires.                    |

#### Returns
The returned `intervalID` is a numeric, non-zero value which identifies the timer created by the call to setInterval(); this value can be passed to `clearInterval()` to cancel the interval.

### clearInterval()
Implements the [`clearInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval) method, which cancels a timed, repeating action which was previously established by a call to `setInterval()`. If the parameter provided does not identify a previously established action, this method does nothing.

#### Signature
`clearInterval(intervalID: number): void`

#### Parameters
| Name          | Type        | Description   |
| --------------| ------------| -----------:  |
| `intervalID` | `number` | The identifier of the repeated action you want to cancel. This ID was returned by the corresponding call to `setInterval()`.|       

#### Returns
None (`undefined`).
