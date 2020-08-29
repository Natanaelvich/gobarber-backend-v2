import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('appointments')
class Appontment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp')
  date: Date;
}

export default Appontment;
