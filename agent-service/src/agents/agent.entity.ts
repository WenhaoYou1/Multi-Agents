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

  @Column({
    type: 'enum',
    enum: AgentType,
    default: AgentType.WORKER,
  })
  type: AgentType;
}
