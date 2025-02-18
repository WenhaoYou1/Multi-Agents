import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) {}

  async createAgent(createAgentDto: CreateAgentDto): Promise<Agent> {
    const newAgent = this.agentRepository.create(createAgentDto);
    return this.agentRepository.save(newAgent);
  }

  async findAll(): Promise<Agent[]> {
    return this.agentRepository.find();
  }

  async findOne(id: number): Promise<Agent | null> {
    return this.agentRepository.findOne({ where: { id } });
  }

  async updateAgent(
    id: number,
    updateData: Partial<Agent>,
  ): Promise<Agent | null> {
    await this.agentRepository.update({ id }, updateData);
    return this.findOne(id);
  }

  async deleteAgent(id: number): Promise<void> {
    await this.agentRepository.delete({ id });
  }
}
