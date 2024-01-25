import { BadGatewayException, Injectable } from '@nestjs/common';
import { IBaseService } from './i-base.service';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseService<E> implements IBaseService<E> {
  constructor(private readonly repository: Repository<E>) {}

  findAll(): Promise<E[]> {
    try {
      return this.repository.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findById(id: number): Promise<E> {
    try {
      return this.repository.findOneBy({
        id,
      } as unknown as FindOptionsWhere<E>);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async save(data: DeepPartial<E>): Promise<E> {
    try {
      const entity = await this.repository.create(data);
      return this.repository.save(entity);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async update(id: number, data: QueryDeepPartialEntity<E>): Promise<E | null> {
    const result = await this.repository.update(id, data);
    if (result.affected && result.affected > 0) {
      return this.findById(id);
    }
    return null;
  }

  remove(id: number): void {
    this.repository.delete(id);
  }
}
