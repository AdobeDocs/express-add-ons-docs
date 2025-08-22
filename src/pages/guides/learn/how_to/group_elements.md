---
keywords:
  - Adobe Express
  - Express Add-on SDK
  - Express Editor
  - Adobe Express
  - Add-on SDK
  - SDK
  - JavaScript
  - Extend
  - Extensibility
  - API
  - Group
  - Lock
  - Nest
title: Group Elements
description: Group Elements.
contributors:
  - https://github.com/undavide
  - https://github.com/hollyschinsky
faq:
  questions:
    - question: "How do I create a group?"
      answer: "Use `editor.createGroup()` to create a group, then append elements with `group.children.append()`."

    - question: "What's the minimum number of elements in a group?"
      answer: "Groups must contain at least two elements to be valid."

    - question: "Can I nest groups inside other groups?"
      answer: "Yes, groups can be nested by appending one group to another group's children."

    - question: "How does element ordering work in groups?"
      answer: "The last element appended appears on top, the first element appears at the bottom."

    - question: "How do I reorder elements in a group?"
      answer: "Use `moveAfter()` or `moveBefore()` methods on the group's children property."

    - question: "How do I insert elements at specific positions?"
      answer: "Use `insertAfter()` or `insertBefore()` methods to place elements at specific positions."

    - question: "How do I move elements between groups?"
      answer: "Use `targetGroup.children.append(sourceElement)` to move an element from one group to another."

    - question: "How do I remove elements from a group?"
      answer: "Use `group.children.remove(element)` to remove and delete the element from the document."
---

# Group Elements

## Create a group

Groups are just like any other element in Adobe Express, very much like Text or Shapes: you must create them, and append them to the page. Interestingly, as instances of the [`GroupNode`](../../../references/document-sandbox/document-apis/classes/GroupNode.md) class, they can host other nodes in their `children` property.

To create a Group, you can use the [`editor.createGroup()`](../../../references/document-sandbox/document-apis/classes/Editor.md#creategroup) method.

### Example

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js
import { editor } from "express-document-sdk";

// Create some Text
const greeting = editor.createText("Hiya!");
greeting.translation = { x: 100, y: 50 };

// Create some other Text
const saluto = editor.createText("Ciao!");
saluto.translation = { x: 100, y: 150 };

// Create a Group 👈
const greetingsGroup = editor.createGroup();
greetingsGroup.translation = { x: 100, y: 100 };

// Append the Text nodes to the Group 👈
greetingsGroup.children.append(greeting, saluto);

// Append the Group to the page 👈
editor.context.insertionParent.children.append(greetingsGroup);
```

#### TypeScript

```ts
// sandbox/code.js
import { editor, StandaloneTextNode, GroupNode, ContainerNode } from "express-document-sdk";

// Create some Text
const greeting: StandaloneTextNode = editor.createText("Hiya!");
greeting.translation = { x: 100, y: 50 };

// Create some other Text
const saluto: StandaloneTextNode = editor.createText("Ciao!");
saluto.translation = { x: 100, y: 150 };

// Create a Group 👈
const greetingsGroup: GroupNode = editor.createGroup();
greetingsGroup.translation = { x: 100, y: 100 };

// Append the Text nodes to the Group 👈
greetingsGroup.children.append(greeting, saluto);

// Append the Group to the page 👈
const insertionParent: ContainerNode = editor.context.insertionParent;
insertionParent.children.append(greetingsGroup);
```

<InlineAlert variant="info" slots="header, text, text1" />

Group append order

You can append the Group to the page and then append the Text nodes to the Group, or the other way around. The order doesn't matter, as long as the Group hits the page at some point.

Please note that the Text nodes in the example above haven't been appended to the page before getting into the group—they're invisible, until they're part of the Group and the Group itself ends on the page.

## Nest groups

Groups can be nested, meaning that you can have a Group inside another Group; just create the needed Group nodes and `append()` elements to their `children` property.

### Example

<CodeBlock slots="heading, code" repeat="2" languages="JavaScript, TypeScript" />

#### JavaScript

```js
// sandbox/code.js

// Create three different Text nodes
const greeting = editor.createText("Hiya!");
const saluto = editor.createText("Ciao!");
const salutation = editor.createText("Salut!");

// Create an inner Group with the first two Text nodes
const innerGroup = editor.createGroup();
innerGroup.children.append(greeting, saluto);

// Create an outer Group with the inner Group and the third Text node
const outerGroup = editor.createGroup();
outerGroup.children.append(innerGroup, salutation);

editor.context.insertionParent.children.append(outerGroup);
```

#### TypeScript

```ts
// sandbox/code.js

// Create three different Text nodes
const greeting: StandaloneTextNode = editor.createText("Hiya!");
const saluto: StandaloneTextNode = editor.createText("Ciao!");
const salutation: StandaloneTextNode = editor.createText("Salut!");

// Create an inner Group with the first two Text nodes
const innerGroup: GroupNode = editor.createGroup();
innerGroup.children.append(greeting, saluto);

// Create an outer Group with the inner Group and the third Text node
const outerGroup: GroupNode = editor.createGroup();
outerGroup.children.append(innerGroup, salutation);

editor.context.insertionParent.children.append(outerGroup);
```

This code results in the following grouping:

```txt
Outer Group
├── Inner Group
│   ├── Text Node: "Hiya!"
│   └─ Text Node: "Ciao!"
│
└── Text Node: "Salut!"
```

<InlineAlert variant="warning" slots="text" />

In Adobe Express, **Groups must contain at least two elements** to be valid—either other Groups or nodes. It's not possible to nest a single element within a Group, like for example, in Adobe Photoshop with Layers and Layer Sets.

## Element order

As you would intuitively expect, the order in which you append elements to a Group matters. The last element you append will be on top of the others, and the first one will be at the bottom.

As follows, a simple Square factory function creates and append a shape to the page, passing an option object with the `size` and `color` (grayscale) and `offset` properties. We'll be using it to test element order in a Group.

```js
// sandbox/code.js
function squareFactory({ size, color, offset = 0 }) {
  const rectangle = editor.createRectangle();

  // Define rectangle dimensions.
  rectangle.width = size;
  rectangle.height = size;

  const insertionParent = editor.context.currentPage;
  console.log(insertionParent.width, insertionParent.height);
  rectangle.setPositionInParent(
    {
      x: insertionParent.width / 2 + offset,
      y: insertionParent.height / 2 + offset,
    },
    { x: rectangle.width / 2, y: rectangle.height / 2 }
  );
  // Define rectangle color.
  rectangle.fill = editor.makeColorFill(
    colorUtils.fromRGB(color, color, color, 1)
  );
  return rectangle;
}
```

### Example: last element on top

Creating a Group with two squares; the lighter one is added last, and it will be on top of the darker one.

```js
// sandbox/code.js
const s1 = squareFactory({ size: 50, color: 0.5 });
const s2 = squareFactory({ size: 50, color: 0.7, offset: 10 });
const group = editor.createGroup();
group.children.append(s1, s2);

editor.context.insertionParent.children.append(group);
```

![Grouping elements](./images/groups_above.png)

### Example: re-ordering elements

It's possible to re-order the elements in the Group by using the `children` property and the `moveAfter()` or `moveBefore()` method.

```js
// sandbox/code.js
const s1 = squareFactory({ size: 50, color: 0.5 });
const s2 = squareFactory({ size: 50, color: 0.7, offset: 10 });
const group = editor.createGroup();
group.children.append(s1, s2);
// s2 is on top of s1, as it's been added last

// Moves s1 after (on top of) s2
group.children.moveAfter(s1, s2);
editor.context.insertionParent.children.append(group);
```

![Grouping elements](./images/groups_below.png)

### Example: addding elements in a specific order

Similarly, it's possible to determine the elements insertion order with `insertAfter()` and `insertBefore()`.

```js
// sandbox/code.js
const s1 = squareFactory({ size: 50, color: 0.5 });
const s2 = squareFactory({ size: 50, color: 0.7, offset: 10 });
const s3 = squareFactory({ size: 50, color: 0.9, offset: 20 });
const group = editor.createGroup();
group.children.append(s1, s2);
// s2 is on top of s1, as it's been added last

// Inserts s3 after s1 (in the middle)
group.children.insertAfter(s3, s1);
editor.context.insertionParent.children.append(group);
```

![Grouping elements](./images/groups_middle.png)

## Move elements out of a Group

To move an element out of one Group (the source) and into another (the target), you can use the `children.append()` method of the target, passing the source element you want to move. It's no different from appending a new element to a Group, you just need to reference the source element regardless of where it is.

### Example

```js
// sandbox/code.js
const s1 = squareFactory({ size: 50, color: 0.1 });
const s2 = squareFactory({ size: 50, color: 0.3, offset: 10 });
const s3 = squareFactory({ size: 50, color: 0.5, offset: 20 });
const s4 = squareFactory({ size: 50, color: 0.7, offset: 30 });
const s5 = squareFactory({ size: 50, color: 0.9, offset: 40 });
const group1 = editor.createGroup();
const group2 = editor.createGroup();

// Grouping elements in two different groups
group1.children.append(s1, s2, s3);
group2.children.append(s4, s5);

editor.context.insertionParent.children.append(group1);
editor.context.insertionParent.children.append(group2);

// Moves s1 into group2
group2.children.append(s1);
// 👆 target group     👆 source element
```

## Remove elements

To remove an element from a Group, you can use the `remove()` method on the `children` property, which effectively also deletes the element from the document.

### Example

```js
// sandbox/code.js
const s1 = squareFactory({ size: 50, color: 0.5 });
const s2 = squareFactory({ size: 50, color: 0.7, offset: 10 });
const s3 = squareFactory({ size: 50, color: 0.9, offset: 20 });
const group = editor.createGroup();
group.children.append(s1, s2, s3);
editor.context.insertionParent.children.append(group);

// Removes s2 from the Group and from the page!
group.children.remove(s2);
```

## FAQs

#### Q: How do I create a group?

**A:** Use `editor.createGroup()` to create a group, then append elements with `group.children.append()`.

#### Q: What's the minimum number of elements in a group?

**A:** Groups must contain at least two elements to be valid.

#### Q: Can I nest groups inside other groups?

**A:** Yes, groups can be nested by appending one group to another group's children.

#### Q: How does element ordering work in groups?

**A:** The last element appended appears on top, the first element appears at the bottom.

#### Q: How do I reorder elements in a group?

**A:** Use `moveAfter()` or `moveBefore()` methods on the group's children property.

#### Q: How do I insert elements at specific positions?

**A:** Use `insertAfter()` or `insertBefore()` methods to place elements at specific positions.

#### Q: How do I move elements between groups?

**A:** Use `targetGroup.children.append(sourceElement)` to move an element from one group to another.

#### Q: How do I remove elements from a group?

**A:** Use `group.children.remove(element)` to remove and delete the element from the document.
