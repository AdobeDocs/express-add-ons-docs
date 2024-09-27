[@express-document-sdk](../overview.md) / StyleRange

# Interface: StyleRange

Represents a range of characters defined by a length (and implicitly started at the end of the previous range).

## Extended by

-   [`CharacterStylesRangeInput`](CharacterStylesRangeInput.md)
-   [`CharacterStylesRange`](CharacterStylesRange.md)

## Properties

### length

• **length**: `number`

The length or number of characters in which character styles will be applied.
Note: since characters are represented as UTF-16 code units, some symbols
such as emojis are considered to have a length of 2.
