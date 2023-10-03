# Requirements
Generative AI content requirements.

## Clearly communicate that generative AI is being used to create output.
If you are using Generative AI to create output assets, please be open and upfront. Do not try to mislead users.

You’ll have an opportunity when submitting your add-on to detail your add-on’s use of generative AI technology, but you may also want to indicate that you’re using generative AI in your add-on’s description or user interface.

<InlineAlert slots="text" variant="warning"/>

Never portray content created using generative UI as stock content created by human artists.

### Examples:

- As part of your add-on’s description: *“Create engaging comic book strips from text using the power of generative AI.”*
- As part of your add-on’s UI: *“Generate images”* (call to action button). 

**Users should be aware that your add-on is using generative AI.**

In the future we’ll call this out separately in the add-on’s listing page. But in the meantime, include at least the following text in your add-on’s description:

*“This add-on uses generative AI technology to create content. You are solely responsible for the use of the content, and Adobe is not responsible for your use of this add-on.”*

## Content created by your add-on must adhere to Adobe’s General terms of use and the Developer terms of use

Refer to the [General Terms of Use](https://www.adobe.com/legal/terms.html) and [Developer Terms of Use](http://www.adobe.com/go/developer-terms) for more information.


## Your add-on must guard against restricted content

At minimum, you must apply filtering at the prompt level to protect against intentional attempts to generate restricted content. However, you might need to add additional filtering after generating content in order to pass Adobe’s automated tests.

**NOTE:** How a model is trained also has a large impact on what it might create. However, the model’s training is often insufficient to ensure that users are never exposed to restricted content.

As such, it’s often necessary to add additional filtering or post-processing steps. For example, you could have a set of words that would be immediately rejected, or a language classifier to detect violent speech, or an image classifier that detects sexual content in the model’s output. 

<InlineAlert slots="text" variant="warning"/>

Your add-on may be tested when you submit to the marketplace to ensure that restricted content is not generated.
