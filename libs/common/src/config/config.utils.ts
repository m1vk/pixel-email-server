import { SchemaType } from 'apps/gateway/src/utils/config/config.type';
import * as Joi from 'joi';
import { any } from 'joi';

export type SchemaTypeConfs = { [n in string]: Joi.Schema };

export class ConfigsUtils {
  protected baseSchemaFields = {
    TRACER_ENABLE: Joi.boolean().default(false),
    TRACER_URL: Joi.string().default(''),
    TRACER_SECRET_KEY: Joi.string().default(''),
    NATS_SERVER_URL: Joi.string().required(),
    // REDIS_HOST: Joi.string().required(),
    // REDIS_PORT: Joi.number().required(),
    // REDIS_PASSWORD: Joi.string().default(''),
  };

  protected confs: SchemaType<typeof this.schema>;

  protected schema = this.baseSchemaFields;

  constructor() {
    this.confs = ConfigsUtils.validateAndExtractEnv(this.schema);
  }

  static validateAndExtractEnv<EnvT extends SchemaTypeConfs>(envSchema: EnvT) {
    const validationSchema = Joi.object(envSchema);
    const { error, value } = validationSchema.validate(process.env, {
      abortEarly: false,
      allowUnknown: true,
    });
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    const result = {} as SchemaType<EnvT>;
    return result;
  }
}
