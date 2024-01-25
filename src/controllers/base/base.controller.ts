import { Get } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';
import { BaseService } from 'src/services/base/base.service';
import { CurrentUser } from 'src/utils/decorators/current-user.decorator';

export class BaseController<E> {
  constructor(private readonly service: BaseService<E>) {}
}
