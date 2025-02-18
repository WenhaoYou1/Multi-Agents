import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { CreateAgentDto } from './dto/create-agent.dto';
import { AgentInteraction } from './agent-interaction.entity';
// import axios from 'axios';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
    @InjectRepository(AgentInteraction)
    private readonly interactionRepository: Repository<AgentInteraction>,
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

  async addInteraction(
    agentId: number,
    userId: number,
    message: string,
  ): Promise<AgentInteraction> {
    // 1) find related agent first
    const agent = await this.agentRepository.findOne({
      where: { id: agentId },
    });
    if (!agent) {
      throw new Error(`Agent with id ${agentId} not found`);
    }
    // 2) TODO: this is the simulated response, can call API later.
    const response = `Your question is: "${message}".`;
    // const response = await this.callLLMApi(message);
    // 3) save the history records
    const interaction = this.interactionRepository.create({
      agent,
      userId,
      message,
      response,
    });
    return this.interactionRepository.save(interaction);
  }

  // private async callLLMApi(prompt: string): Promise<string> {
  //   const apiKey = process.env.OPENAI_API_KEY; // add to .env later if get the tokens
  //   const apiUrl = 'https://api.openai.com/v1/completions';
  //   try {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  //     const response = await axios.post(
  //       apiUrl,
  //       {
  //         model: 'text-davinci-003',
  //         prompt: prompt,
  //         max_tokens: 500,
  //         temperature: 0.7,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${apiKey}`,
  //         },
  //       },
  //     );
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  //     return response.data.choices[0].text.trim();
  //   } catch (error: unknown) {
  //     console.error('LLM API error:', error);
  //     return 'Sorry, can not ...';
  //   }
  // }

  async getInteractions(agentId: number): Promise<AgentInteraction[]> {
    return this.interactionRepository.find({
      where: { agent: { id: agentId } },
      order: { createdAt: 'ASC' },
    });
  }
}
