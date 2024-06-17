import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/api/users')
export class UserController {
  @Post()
  cobaPost(): string {
    return 'Use HTTP POST request';
  }

  @Get('/coba')
  cobaGet(): string {
    return 'Use HTTP GET request berhasil dikembalikan';
  }

  @Get('/nama-saya')
  cobaNamaSaya(@Query('name') name: string): string {
    return `Nama Saya ${name || 'Budi'}`;
  }

  @Get('/coba-response')
  @Header('content-type', 'application/json')
  @HttpCode(200)
  cobaResponse(): Record<string, string> {
    return {
      data: 'Berhasil menggunakan response decorator',
    };
  }

  @Get('/coba-asynchronous')
  async cobaAsynchronous(@Query('name') name: string): Promise<string> {
    return `Nama saya ${name || 'Budi'}. Saya berhasil mencoba method async di controller.`;
  }

  @Get('/set-cookie')
  cobaSetCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Berhasil mengatur cookie');
  }

  @Get('/get-cookie')
  cobaGetCookie(@Req() request: Request): Record<any, any> {
    const cookieName = request.cookies['name'];
    // return `Cookie Name: ${cookieName}`;
    return {
      status: true,
      message: 'Berhasil mendapatkan cookie',
      data: cookieName,
    };
  }

  @Get('/web-view')
  cobaWebView(@Res() response: Response) {
    response.render('index.html', {
      header: 'Web View Header',
      title: 'Template Engine',
      content: 'This is simple blog using template engine.',
    });
  }
}
