import { Inject, Injectable } from '@nestjs/common';
import { MailModuleOptions } from './mail.interfaces';
import * as FormData from 'form-data';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import got from 'got';
import fetch from 'node-fetch';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {
    this.sendEmail('testing', 'test');
  }

  private async sendEmail(subject: string, content: string) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', 'siwandevelop@gmail.com'); //유저 메일명 들어가는 곳 인수로 넣어야함
    form.append('subject', subject);
    form.append('text', content);

    const response = await got(
      `https://api.mailgun.net/v3/${this.options.domain}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      },
    );
    console.log('response:', response);
  }
}
