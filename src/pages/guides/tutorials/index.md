---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extensibility
  - API
title: Adobe Express Add-on Tutorials
description: Adobe Express Add-on Tutorials covering the Adobe Express Add-on SDK and Document API
contributors:
  - https://github.com/hollyschinsky  
  - https://github.com/undavide
---

# Tutorials

In this page, you'll find a variety of tutorials covering the Adobe Express Add-on UI SDK and Document Sandbox APIs.

<Resource-Card slots="link, image, text" width="50%"/>

[Creating a Grid System add-on with the Adobe Express Document API](grids-addon.md)

![Grids add-on](./images/thumbs-grids-addon.png)

Davide Barranca - November 6th, 2023

<Resource-Card slots="link, image, text" width="50%"/>

[Creating a Stats add-on with the Adobe Express Communication API](stats-addon.md)

![Coming Soon](./images/thumbs-stats-addon.png)

Davide Barranca - December 14th, 2023

<Resource-Card slots="link, image, text" width="50%"/>

[Building UIs using Adobe's Spectrum Design System](spectrum-workshop/index.md)

![Grids add-on](./images/bingo-v1-addon.png)

Holly Schinsky - January 25th, 2024

### absoluteTransform

<Tab orientation="vertical" slots="heading, image, content" repeat="3"  theme="dark" className='bgBlue ' />

## Tab 1

![Code for initializing SDK](./images/bingo-v1-addon.png)

content tab 1

## Tab 2

![Code to invoke full editor](./images/bingo-v1-addon.png)

content tab 2

## Tab 3

![Code to invoke quick actions](./images/bingo-v1-addon.png)

content tab 3

<Tab orientation="horizontal" slots="heading, content" repeat="2" theme="light"/>

### Request

```graphql
mutation {
  createCustomerV2(
    input: {
      firstname: "Bob"
      lastname: "Loblaw"
      email: "bobloblaw@example.com"
      password: "b0bl0bl@w"
      is_subscribed: true
    }
  ) {
    customer {
      firstname
      lastname
      email
      is_subscribed
    }
  }
}
```

### Response

```json
{
  "data": {
    "createCustomer": {
      "customer": {
        "firstname": "Bob",
        "lastname": "Loblaw",
        "email": "bobloblaw@example.com",
        "is_subscribed": true
      }
    }
  }
}
```