import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { CreateProfileDto } from '../../entities/dto/create-profile.dto';
import { AppModule } from '../../app.module';
import { ProfileRepository } from '../../repositories/profile.repository';
import { UserRepository } from '../../repositories/user.repository';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../../entities/dto/login.dto';

describe('Auth Service', () => {
  let authService: AuthService;
  let profileRepository: ProfileRepository;
  let userRepository: UserRepository;

  const createProfileDto = {
    firstName: 'Fazri',
    lastName: 'Ridwan',
    email: 'fazriridwan@gmail.com',
    phone: '085352307024',
    username: 'fazri',
    password: 'fazri',
  } as CreateProfileDto;

  const loginDto = {
    username: 'fazri',
    password: 'fazri',
  } as LoginDto;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    profileRepository = moduleRef.get<ProfileRepository>(ProfileRepository);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  describe('registration', () => {
    afterEach(async () => {
      await userRepository.delete({
        username: createProfileDto.username,
      });
      await profileRepository.delete({
        phone: createProfileDto.phone,
      });
    });
    it('should create new user profile', async () => {
      const result = await authService.registration(createProfileDto);
      const spy = jest
        .spyOn(authService, 'registration')
        .mockImplementation((createProfileDto) => result);

      expect(result.firstName).toBe(createProfileDto.firstName);
      expect(result.lastName).toBe(createProfileDto.lastName);
      expect(result.email).toBe(createProfileDto.email);
      expect(result.phone).toBe(createProfileDto.phone);
      expect(result.birth).toBeDefined();

      spy.mockReset();
      spy.mockRestore();
    });
    it('should reject if first name is empty', async () => {
      const result = await authService.registration({
        lastName: createProfileDto.lastName,
        email: createProfileDto.email,
        phone: createProfileDto.phone,
        username: createProfileDto.username,
        password: createProfileDto.password,
      } as CreateProfileDto);
      const spy = jest
        .spyOn(authService, 'registration')
        .mockImplementation((createProfileDto) => result);

      expect(result).toBeInstanceOf(BadRequestException);

      spy.mockReset();
      spy.mockRestore();
    });
    it('should reject if phone is empty', async () => {
      const result = await authService.registration({
        firstName: createProfileDto.firstName,
        lastName: createProfileDto.lastName,
        email: createProfileDto.email,
        username: createProfileDto.username,
        password: createProfileDto.password,
      } as CreateProfileDto);
      const spy = jest
        .spyOn(authService, 'registration')
        .mockImplementation((createProfileDto) => result);

      expect(result).toBeInstanceOf(BadRequestException);

      spy.mockReset();
      spy.mockRestore();
    });
    it('should reject if username is empty', async () => {
      const result = await authService.registration({
        firstName: createProfileDto.firstName,
        lastName: createProfileDto.lastName,
        email: createProfileDto.email,
        phone: createProfileDto.phone,
        password: createProfileDto.password,
      } as CreateProfileDto);
      const spy = jest
        .spyOn(authService, 'registration')
        .mockImplementation((createProfileDto) => result);

      expect(result).toBeInstanceOf(BadRequestException);

      spy.mockReset();
      spy.mockRestore();
    });
    it('should reject if password is empty', async () => {
      const result = await authService.registration({
        firstName: createProfileDto.firstName,
        lastName: createProfileDto.lastName,
        email: createProfileDto.email,
        phone: createProfileDto.phone,
        username: createProfileDto.username,
      } as CreateProfileDto);
      const spy = jest
        .spyOn(authService, 'registration')
        .mockImplementation((createProfileDto) => result);

      expect(result).toBeInstanceOf(BadRequestException);

      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await authService.registration(createProfileDto);
    });
    afterEach(async () => {
      await userRepository.delete({
        username: createProfileDto.username,
      });
      await profileRepository.delete({
        phone: createProfileDto.phone,
      });
    });
    it('should generate token', async () => {
      const result = await authService.login(loginDto);
      const spy = jest
        .spyOn(authService, 'login')
        .mockImplementation((loginDto) => result);

      expect(result.token).toBeDefined();

      spy.mockReset();
      spy.mockRestore();
    });
    it('should reject if username is invalid', async () => {
      const result = await authService.login({
        username: 'fazri123',
        password: loginDto.password,
      } as LoginDto);
      const spy = jest
        .spyOn(authService, 'login')
        .mockImplementation((loginDto) => result);

      expect(result).toBeInstanceOf(UnauthorizedException);

      spy.mockReset();
      spy.mockRestore();
    });
    it('should reject if password is invalid', async () => {
      const result = await authService.login({
        username: loginDto.username,
        password: 'fazri123',
      } as LoginDto);
      const spy = jest
        .spyOn(authService, 'login')
        .mockImplementation((loginDto) => result);

      expect(result).toBeInstanceOf(UnauthorizedException);

      spy.mockReset();
      spy.mockRestore();
    });
  });
});
