import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Agent } from './agent.entity';

@Entity()
export class AgentInteraction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Agent, (agent) => agent.id)
  agent: Agent;

  @Column()
  userId: number;
  @Column('text')
  message: string;

  @Column('text', { nullable: true })
  response: string; // agent has response

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
