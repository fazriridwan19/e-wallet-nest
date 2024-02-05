import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateProfileDto } from '../src/entities/dto/create-profile.dto';
import { ProfileService } from '../src/services/profile.service';
import { ProfileRepository } from '../src/repositories/profile.repository';
import { LoginDto } from '../src/entities/dto/login.dto';
import { UserRepository } from '../src/repositories/user.repository';
import { CreateWalletDto } from '../src/entities/dto/create-wallet.dto';
import { AuthService } from '../src/services/auth.service';
import { WalletRepository } from '../src/repositories/wallet.repository';
import { WalletService } from '../src/services/wallet.service';

describe('Application test (e2e)', () => {
  let app: INestApplication;
  let profileRepository: ProfileRepository;
  let userRepository: UserRepository;
  let profileService: ProfileService;
  let authService: AuthService;
  let walletService: WalletService;
  let walletRepository: WalletRepository;
  let createProfileDto: CreateProfileDto = {
    firstName: 'Fazri',
    lastName: 'Ridwan',
    email: 'fazriridwan@gmail.com',
    phone: '085352307024',
    username: 'fazri',
    password: 'fazri',
  } as unknown as CreateProfileDto;
  let createWalletDto: CreateWalletDto = {
    name: 'Wallet test',
    account: '085352307024',
  } as CreateWalletDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3000);
    profileRepository = app.get(ProfileRepository);
    userRepository = app.get(UserRepository);
    profileService = app.get(ProfileService);
    authService = app.get(AuthService);
    walletRepository = app.get(WalletRepository);
    walletService = app.get(WalletService);
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('POST /auth/registration', () => {
      afterEach(async () => {
        await userRepository.delete({
          username: createProfileDto.username,
        });
        await profileRepository.delete({
          phone: createProfileDto.phone,
        });
      });
      it('should throw if first name empty', () => {
        return request(app.getHttpServer())
          .post('/auth/registration')
          .send({
            lastName: createProfileDto.lastName,
            email: createProfileDto.email,
            phone: createProfileDto.phone,
            username: createProfileDto.username,
            password: createProfileDto.password,
          })
          .expect(400);
      });
      it('should throw if phone empty', () => {
        return request(app.getHttpServer())
          .post('/auth/registration')
          .send({
            firsName: createProfileDto.firstName,
            lastName: createProfileDto.lastName,
            email: createProfileDto.email,
            username: createProfileDto.username,
            password: createProfileDto.password,
          })
          .expect(400);
      });
      it('should throw if username empty', () => {
        return request(app.getHttpServer())
          .post('/auth/registration')
          .send({
            firsName: createProfileDto.firstName,
            lastName: createProfileDto.lastName,
            email: createProfileDto.email,
            phone: createProfileDto.phone,
            password: createProfileDto.password,
          })
          .expect(400);
      });
      it('should throw if password empty', () => {
        return request(app.getHttpServer())
          .post('/auth/registration')
          .send({
            firstName: createProfileDto.firstName,
            lastName: createProfileDto.lastName,
            email: createProfileDto.email,
            phone: createProfileDto.phone,
            username: createProfileDto.username,
          })
          .expect(400);
      });
      it('should created user', async () => {
        const result = await request(app.getHttpServer())
          .post('/auth/registration')
          .send(createProfileDto);
        expect(result.status).toBe(201);
        expect(result.body.id).toBeDefined();
        expect(result.body.firstName).toBe(createProfileDto.firstName);
        expect(result.body.lastName).toBe(createProfileDto.lastName);
        expect(result.body.phone).toBe(createProfileDto.phone);
        expect(result.body.email).toBe(createProfileDto.email);
      });
    });

    describe('POST /auth/login', () => {
      beforeEach(async () => {
        await profileService.create(createProfileDto);
      });
      afterEach(async () => {
        await userRepository.delete({
          username: createProfileDto.username,
        });
        await profileRepository.delete({
          phone: createProfileDto.phone,
        });
      });
      it('should retrieve token if login success', async () => {
        const result = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            username: 'fazri',
            password: 'fazri',
          } as LoginDto);
        expect(result.status).toBe(200);
        expect(result.body.token).toBeDefined();
      });
      it('should throw if username invalid', async () => {
        const result = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            username: 'fazri123',
            password: 'fazri',
          } as LoginDto);
        expect(result.status).toBe(401);
      });
      it('should throw if pasword invalid', async () => {
        const result = await request(app.getHttpServer())
          .post('/auth/login')
          .send({
            username: 'fazri',
            password: 'fazri123',
          } as LoginDto);
        expect(result.status).toBe(401);
      });
    });
  });

  describe('Wallet', () => {
    describe('POST /wallet', () => {
      beforeEach(async () => {
        await profileService.create(createProfileDto);
      });
      afterEach(async () => {
        await walletRepository.delete({
          account: createWalletDto.account,
        });
        await userRepository.delete({
          username: createProfileDto.username,
        });
        await profileRepository.delete({
          phone: createProfileDto.phone,
        });
      });
      it('should create new wallet with logged in user', async () => {
        let { token } = await authService.login({
          username: createProfileDto.username,
          password: createProfileDto.password,
        } as LoginDto);
        const result = await request(app.getHttpServer())
          .post('/wallet')
          .set('Authorization', `Bearer ${token}`)
          .send(createWalletDto);

        expect(result.status).toBe(201);
        expect(result.body.statusCode).toBeDefined();
        expect(result.body.message).toBeDefined();
        expect(result.body.data).toBeDefined();
      });
      it('should reject if wallet name is empty', async () => {
        let { token } = await authService.login({
          username: createProfileDto.username,
          password: createProfileDto.password,
        } as LoginDto);
        const result = await request(app.getHttpServer())
          .post('/wallet')
          .set('Authorization', `Bearer ${token}`)
          .send({
            account: createWalletDto.account,
          } as CreateWalletDto);

        expect(result.status).toBe(400);
        expect(result.body.error).toBeDefined();
      });
    });

    describe('GET /wallet', () => {
      beforeEach(async () => {
        await profileService.create(createProfileDto);
        const profile = await profileService.findByUsername(
          createProfileDto.username,
        );
        await walletService.saveWith(profile, createWalletDto);
      });
      afterEach(async () => {
        await walletRepository.delete({
          account: createWalletDto.account,
        });
        await userRepository.delete({
          username: createProfileDto.username,
        });
        await profileRepository.delete({
          phone: createProfileDto.phone,
        });
      });
      it('should retrieve array of wallet of logged in user', async () => {
        let { token } = await authService.login({
          username: createProfileDto.username,
          password: createProfileDto.password,
        } as LoginDto);
        const result = await request(app.getHttpServer())
          .get('/wallet')
          .set('Authorization', `Bearer ${token}`);

        expect(result.status).toBe(200);
        expect(result.body.data).toBeInstanceOf(Array);
      });
      it('should reject if user not logged in', async () => {
        const result = await request(app.getHttpServer()).get('/wallet');
        expect(result.status).toBe(401);
        expect(result.error).toBeDefined();
      });
    });
  });
});
