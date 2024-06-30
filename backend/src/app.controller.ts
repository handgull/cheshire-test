import { Controller, Get } from '@nestjs/common';
import CatClient from 'ccat-api';

@Controller()
export class AppController {
  private cat = new CatClient({
    baseUrl: 'localhost',
  })
    .onConnected(() => {
      console.log('Socket connected');
    })
    .onMessage((msg) => {
      console.log(msg);
    })
    .onError((err, event) => {
      console.log(err);
      console.log(event);
    })
    .onDisconnected(() => {
      console.log('Socket disconnected');
    });

  @Get()
  getTest() {
    this.cat.send('Hello from a user!');
    return 'sended something to the cat';
  }
}
