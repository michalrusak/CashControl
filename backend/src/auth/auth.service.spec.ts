import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
// import { Model } from 'mongoose';
// import { User } from '../shared/models/user.model';
// import { getModelToken } from '@nestjs/mongoose';

describe('AuthService', () => {
  let service: AuthService;
  // let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // {
        //   provide: getModelToken(User.name),
        //   useValue: Model,
        // },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    // model = module.get<Model<User>>(Model);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
