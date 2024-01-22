import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ name: 'profile_id' })
  profileId: number;

  @Column({ length: 50, unique: true, nullable: false })
  username: string;

  @Column('text', { nullable: false })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  constructor(data: CreateProfileDto) {
    Object.assign(this, data);
  }
}
