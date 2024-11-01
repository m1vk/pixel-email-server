import { ConfigsUtils } from '../../../../../libs/common/src/config/config.utils'
import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { SchemaType } from './config.type';

@Injectable()
export class ConfigService extends ConfigsUtils {
  protected schema = {
    ...this.baseSchemaFields,
    PORT: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRE: Joi.number().required(),
    ADMIN_ROOT_NAME: Joi.string().required(),
    ADMIN_ROOT_PASSWORD: Joi.string().required(),
  };

  protected confs: SchemaType<typeof this.schema>;

  constructor() {
    super();
    this.confs = ConfigsUtils.validateAndExtractEnv(this.schema);
  }

  get port() {
    return this.confs.PORT;
  }

  get jwtConfig() {
    return {
      secret: this.confs.JWT_SECRET,
      expiresIn: this.confs.JWT_EXPIRE,
    };
  }

  get rootAdmin() {
    return {
      password: this.confs.ADMIN_ROOT_PASSWORD,
      username: this.confs.ADMIN_ROOT_NAME,
    };
  }

  // -----------------------------------------------------------------
  // Communication
  // -----------------------------------------------------------------

  get communicationOptions() {
    return {
      transport: Transport.NATS as number,
      options: {
        servers: [this.confs.NATS_SERVER_URL],
        queue: 'accounts',
      },
    };
  }
}
