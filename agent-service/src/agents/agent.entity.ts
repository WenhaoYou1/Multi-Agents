import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum AgentType {
  WORKER = 'worker',
  MANAGER = 'manager',
}

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  prompt: string;

  // alterative method since SQLite does not support enum
  @Column({ type: 'varchar', length: 10 })
  type: AgentType;
}
