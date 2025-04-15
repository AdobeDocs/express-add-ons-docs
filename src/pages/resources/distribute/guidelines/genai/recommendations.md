# Recommendations

Our best practices for Generative AI add-ons

## Overview

The following recommendations are suggestions which we think will help you to optimize the user experience of your add-ons.

However, we will not remove an add-on if we find these recommendations are not implemented.

## Create content quickly

Users expect to be able to quickly add assets to their documents quickly and efficiently.

While generative AI technologies often take several seconds to yield results, you should ensure that users can start to see results after a short period of time (**ideally less than fifteen seconds**).

You should also display an appropriate spinner, shimmer, or other appropriate animation while results are being generated, so that users know that the process is still underway.

You might want to consider quickly returning a single image before generating variations as well.

Add-ons that take too long to generate content are not likely to see repeat use.

## Share information about your AI ethics position

If your add-on leverage generative AI technologies, you should provide information to the user about how models are trained and used from an ethical perspective.

While your ethics don’t have to match Adobe’s perfectly, users should be able to learn about your ethical standards and how these standards apply to your use of AI.

## Share information about how your add-on uses generative AI

It’s pretty clear how an add-on that generates an image from a text prompt leverages generative AI.

But there are other workflows where it might not be clear that generative AI is used, why it is used, and how it is used to facilitate a given workflow.

Users should be provided with information about how and why your add-on leverages generative AI so they can understand its potential applications and limitations.

## Set clear expectations with your users about what is acceptable and what is not

You might have additional requirements regarding acceptable content. Perhaps you want to introduce additional content restrictions beyond the Adobe requirements.

Be sure to communicate these to your users.

These requirements can be listed in any number of locations:

- In the add-on itself
- In the add-on’s description
- As part of any of the links you provide when you submit an add-on to the marketplace (including terms of use or how your add-on uses AI).

## Provide a mechanism for reporting inappropriate content

No content filter or classifier is perfect, and it’s possible that some restricted content might be generated unintentionally, even with a safe prompt.

You may provide your users with a mechanism for alerting you when this happens, so that you can take appropriate action to ensure that similar content isn’t generated in the future.

Users can also use the “Report Abuse” feature inside Adobe Express to report content, but this report will only be sent to Adobe.

**If we receive a significant amount of abuse reports, we may remove your add-on for the safety of our users.**

## If you remove generated content or prevent content from being generated, be clear as to why

Be sure to provide a notice to your users about why your add-on couldn’t generate content, or why an output asset might have been removed.

You don’t need to go into details, but users shouldn’t be faced with blank content or terse, indecipherable error messages.

You can use the Firefly web app or Text-to-image features in Adobe Express as a good guide on how to do this.

## Haven’t found what you’re looking for? Let us know

These recommendations are a “living document” and will be updated over time, as our guidelines - and the technology itself - evolve. If you have any questions about a specific case or issue, or would like to learn more about our requirements, please [contact us](mailto:cc-extensibility-genai-integration-support@adobe.com).
