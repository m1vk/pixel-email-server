import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class UserController {
  constructor(

  ) {}

  @MessagePattern({ cmd: 'accounts.user.create' })
  userCreate(): void {

  }

  @MessagePattern({ cmd: 'accounts.user.find' })
  userFind(): void {

  }

  @MessagePattern({ cmd: 'accounts.user.find.by.id' })
  userFindById(): void {

  }

  @MessagePattern({ cmd: 'accounts.user.login' })
  userLogin(): void {

  }
}