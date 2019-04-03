import { render } from 'ejs';
import * as AWS from 'aws-sdk';

export interface IMailOptions {
  toAddresses: string[];
  subject: string;
  fields: any;
  template: string;
  bccAddresses?: string[];
  fromName: string;
  fromEmail: string;
  ses: AWS.SES;
}

export const sendEmail = (mailOptions: IMailOptions) => {
  // email config
  const params = {
    Destination: {
      ToAddresses: mailOptions.toAddresses,
      BccAddresses: mailOptions.bccAddresses,
    },
    Message: {
      Body: {
        Html: {
          Data: render(mailOptions.template, mailOptions.fields),
        },
      },
      Subject: { Data: mailOptions.subject },
    },
    Source: `${mailOptions.fromName} ${mailOptions.fromEmail}` /* required */,
  };

  return mailOptions.ses.sendEmail(params).promise();
};
