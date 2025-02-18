import { AgentType } from '../agent.entity';

export class CreateAgentDto {
  name: string;
  prompt: string;
  type: AgentType;
}
