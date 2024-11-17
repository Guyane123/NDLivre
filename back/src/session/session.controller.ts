import { Controller, Get, Req, Session } from '@nestjs/common';

@Controller('session')
export class SessionController {
  @Get('')
  findAll(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
  }
}
