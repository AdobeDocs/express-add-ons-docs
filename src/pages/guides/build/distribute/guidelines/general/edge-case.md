---
keywords:
  - Adobe Express
  - Add-on SDK
  - Edge Cases
  - Testing
  - Quality Assurance
  - Boundary Values
  - Error Handling
  - Input Validation
  - Performance Testing
  - Extreme Scenarios
title: Edge Case Testing Guidelines
description: Adobe Express add-on testing requirements for edge cases, boundary values, extreme scenarios, and comprehensive quality assurance practices.
contributors:
  - https://github.com/hollyschinsky
---

# Testing for edge cases

Edge cases may affect the performance of your add-on.

## Overview

As well as checking for more expected errors, you must also take the time to search for edge cases that may affect the performance of your add-on.

This includes checking for boundary values or extreme scenarios that may cause issues when your add-on is in general use.

## Handling inputs

Ensure that your add-on can handle edge cases such as empty inputs, long inputs or inputs with special characters.

## Boundary values

Your add-on should also be able to handle boundary values such as minimum or maximum allowed values without any unexpected behavior.

## Extreme scenarios

Your add-on should be able to cope with extreme situations such as low system resources, poor network conditions, or unexpected interruptions.

## Tab navigation

Users often use tab navigation to make their way through websites and applications. This is particularly true of users with disabilities who rely on keyboard navigation.

Please ensure that add-ons do not interfere with - or override - tab navigation.
