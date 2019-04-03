# Send Email

Simple formatted wrapper around the standard `AWS.SES.sendMail` function. Email body parses in [ejs]() rendering engine with template support.

## Install

```
npm i --save CubetLabs/send-email
```

This package is Typescript Ready. You don't have to install definitions additionally for using with Typescript.

## Usage

The exposed `sendEmail` function returns a promise.

Example:

```ts
import { sendEmail } from 'send-email';
// or
const { sendEmail } = require('send-email');

sendEmail(
  toAddresses: ['fluffy@cats.com', 'kity@cats.com'],
  subject: 'Jerry is an issue',
  template: '<%= ejs %> template',
  fields: {
    data: 'to render template'
  };
  fromName: 'Tom',
  fromEmail: 'tom@cats.com',
  ses: AWS.SES, // the ses object
  bccAddresses: ['no-one@knows.com'], // optional
)
  .then(() => {
    console.log('mail sent');
  })
  .catch(err => {
    console.log('err', err);
  });
```

Or you can use `async/await`

```ts
// inside async function
await sendEmail( ... )
```

If you are using Typescript, you can pull the `IMailOptions` interface to construct the email options.

Example:

```ts
import {IMailOptions} from 'send-mail';

const mailOptions: IMailOptions = {
  toAddresses,
  subject,
  // ...
}

// ...

await sendMail(mailOptions).then(...).catch(...);
```

# Licence

MIT © [Vajahath Ahmed](https://twitter.com/vajahath7)
