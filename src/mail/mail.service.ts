import { Inject, Injectable } from '@nestjs/common';
import { EmailVar, MailModuleOptions } from './mail.interfaces';
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

  private async sendEmail(
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: this.options.apiKey,
    });

    const createObj = {
      from: `Siwan from Nuber Eats <mailgun@${this.options.domain}>`,
      to: ['siwandevelop@gmail.com'],
      subject: 'Hello2',
      template: template,
      ['X-Mailgun-Variables']: '{"test": "test"}',
    };
    emailVars.forEach(({ key, value }) => {
      createObj['v:' + key] = value;
    });

    try {
      mg.messages.create(this.options.domain, createObj);
    } catch (error) {
      console.log(error);
    }
  }
  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'confirm mail', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
