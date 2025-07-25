import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../../models/login.dto';
import { AuthRepository } from '../../repositories/auth.repository';
import { BcryptService } from '@src/common/services/bcrypt/bcrypt.service';
import { TranslationService } from '@src/common/helpers/i18n-translation';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly bcryptService: BcryptService,
    private readonly translation: TranslationService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credentials: LoginDto) {
    const user = await this.authRepository.findUserByUsername(
      credentials.username,
    );
    if (!user)
      throw new NotFoundException(this.translation.t('auth.userNotFound'));

    const isValid = await this.bcryptService.chechPasswordHash(
      credentials.password,
      user.password,
    );
    if (!isValid) {
      throw new UnauthorizedException(
        this.translation.t('auth.invalidCredentials'),
      );
    }
    const token = this.jwtService.generateToken({
      roleId: 1,
      username: user.username,
    });
    return token;
  }
}
