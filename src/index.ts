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

/**
 * un-comment below function for quick testing sendEmail()
 */
/*
sendEmail({
  toAddresses: ['vajahath.ahmed@cubettech.com'],
  subject: 'Sample test',
  template: EmailTemplates.SAMPLE,
  fields: { ejsContent: 'ejs-stuff' },
})
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log('ERR', err));
*/
/**
 * ORIGINAL PARAMS:
 */

// const params = {
// 	Destination: {
// 		/* required */
// 		BccAddresses: [
// 			// 'STRING_VALUE',
// 			/* more items */
// 		],
// 		CcAddresses: [
// 			// 'STRING_VALUE',
// 			/* more items */
// 		],
// 		ToAddresses: [
// 			// 'STRING_VALUE',
// 			/* more items */
// 		],
// 	},
// 	Message: {
// 		/* required */
// 		Body: {
// 			/* required */
// 			Html: {
// 				Data: '' /* required */,
// 				// Charset: 'STRING_VALUE',
// 			},
// 			// Text: {
// 			// 	Data: 'STRING_VALUE' /* required */,
// 			// 	Charset: 'STRING_VALUE',
// 			// },
// 		},
// 		Subject: {
// 			/* required */
// 			Data: 'Default subject' /* required */,
// 			// Charset: 'STRING_VALUE',
// 		},
// 	},
// 	Source: 'no_reply@aumet.me' /* required */,
// 	ConfigurationSetName: 'STRING_VALUE',
// 	ReplyToAddresses: [
// 		'STRING_VALUE',
// 		/* more items */
// 	],
// 	ReturnPath: 'STRING_VALUE',
// 	ReturnPathArn: 'STRING_VALUE',
// 	SourceArn: 'STRING_VALUE',
// 	Tags: [
// 		{
// 			Name: 'STRING_VALUE' /* required */,
// 			Value: 'STRING_VALUE' /* required */,
// 		},
// 		/* more items */
// 	],
// };
