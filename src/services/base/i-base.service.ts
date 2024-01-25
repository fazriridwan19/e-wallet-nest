import { Profile } from 'src/entities/profile.entity';
import { DeepPartial, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IBaseService<T> {
  findAll(user: Profile | undefined): Promise<T[]>;
  findById(
    options: number | FindOneOptions<T> | FindOptionsWhere<T>,
  ): Promise<T>;
  save(data: DeepPartial<T>): Promise<T>;
  update(
    options: number | FindOneOptions<T> | FindOptionsWhere<T>,
    data: QueryDeepPartialEntity<T>,
  ): Promise<T | null>;
  remove(options: number | FindOneOptions<T> | FindOptionsWhere<T>): void;
}
