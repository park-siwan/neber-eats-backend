import { Inject, Injectable } from '@nestjs/common';
import { MailModuleOptions } from './mail.interfaces';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import got from 'got';
import fetch from 'node-fetch';
import Mailgun from 'mailgun.js';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    // this.sendEmail('testing', 'test');
  }

  private async sendEmail(subject: string, content: string) {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: this.options.apiKey,
    });

    mg.messages
      .create(this.options.domain, {
        from: `Excited User <mailgun@${this.options.domain}>`,
        to: ['siwandevelop@gmail.com'],
        subject: 'Hello2',
        template: 'confirm mail',
        ['X-Mailgun-Variables']: '{"test": "test"}',
        ['v:code']: 'asdfsd',
        ['v:username']: 'siwan!!!',
      })
      .then((msg) => console.log(msg)) // logs response data
      .catch((err) => console.log(err)); // logs any error
  }
}
