import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Database } from '../enums/database.enum';
import { UserSchema } from '../shared/models/user.model';
import { EndPoints } from '../enums/endPoints.enum';
import { AuthMiddleware } from '../shared/middlewares/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Database.user, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: `${EndPoints.user}*`, method: RequestMethod.ALL });
  }
}
