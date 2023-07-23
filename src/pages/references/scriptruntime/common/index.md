# Common APIs
The common APIs are objects injected by the script runtime to allow you access common utility functions in your JavaScript. 

## Overview
The common APIs allow you to use basic functions in your JavaScript code to perform things like setting timeouts, using console logging functions etc. They are limited to very basic functions currently, as defined in the next section. 


## Injected Objects
The following global objects are injected by the script runtime for use in your add-ons:

```js
interface Console {
    log(msg?: any, ...subst: any[]): void;
    info(msg?: any, ...subst: any[]): void;
    warn(msg?: any, ...subst: any[]): void;
    error(msg?: any, ...subst: any[]): void;
    debug(msg?: any, ...subst: any[]): void;
    clear(): void;
    assert(assertion?: boolean, msg?: string, ...subst: any[]): void;
}

declare global {
    var console: Console;
    function setTimeout(functionRef: Function, delay: number, ...params: any[]): number;
    function clearTimeout(timeoutID: number): void;
    function setInterval(functionRef: Function, delay: number, ...params: any[]): number;
    function clearInterval(intervalID: number): void;
}
```