# Portfolio contact success state

## Decision

After Resend confirms delivery, the portfolio contact flow opens a branded success dialog instead of leaving a small inline success message beneath the form. The dialog thanks the visitor for their business, confirms that the note was received, and sets the expectation that Farid will reach out soon.

The visual direction was approved in the Penpot `fidexa` file on the `Portfolio Site Redesign` page:

- `05 Contact Success / desktop` uses a full-frame dark scrim, centered Fidexa card, success marker, readable copy, and the existing Primary button component for dismissal.
- `05 Contact Success / iPhone` is a real `393×852` board with the same content adapted to a narrow card and wrapped heading.

## Interaction contract

- The dialog appears only when the server action returns a confirmed Resend message id.
- The form resets only after confirmed delivery.
- The dialog uses `role="dialog"`, `aria-modal="true"`, a labelled heading, and a described body.
- Close works through the visible button, Escape, or clicking the scrim.
- Focus moves to the close button while open and returns to the previously focused element when closed.
- Delivery failures remain inline and do not show a success state.

## Content

- Heading: “Thanks for reaching out.”
- Body: “Thanks for your business. I’ve received your note and will reach out soon.”
- Dismissal: “Close”

## Validation

The implementation must pass the portfolio design contract, TypeScript checking, and the production build. Browser review must confirm zero horizontal overflow at MacBook (`1512×982`) and iPhone (`393×852`) sizes, with no success dialog rendered before submission.
