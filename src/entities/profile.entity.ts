import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { CreateProfileDto } from 'src/dtos/create-profile.dto';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 50, nullable: true })
  lastName: string;

  @Column({ nullable: true })
  birth: Date;

  @Column({ unique: true, length: 100, nullable: true })
  email: string;

  @Column({ unique: true, length: 15, nullable: false })
  phone: string;

  @OneToOne(() => User, (user) => user.profile, { cascade: true })
  user: User;

  constructor(data: CreateProfileDto) {
    Object.assign(this, data);
  }
}
