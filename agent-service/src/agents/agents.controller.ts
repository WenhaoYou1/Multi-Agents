// src/agents/agents.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from './agent.entity';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { JwtPayload } from 'src/auth/types/jwt-payload.interface';
import { Request } from 'express';

interface UserRequest extends Request {
  user: JwtPayload;
}

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @UseGuards(JwtAuthGuard) // if you want to create agent, need to log in.
  @Post()
  async create(@Body() dto: CreateAgentDto): Promise<Agent> {
    return this.agentsService.createAgent(dto);
  }

  // get all the agents, no need to log in.
  @Get()
  async findAll(): Promise<Agent[]> {
    return this.agentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Agent | null> {
    return this.agentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Partial<Agent>) {
    return this.agentsService.updateAgent(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.agentsService.deleteAgent(+id);
  }

  // chat API
  @UseGuards(JwtAuthGuard)
  @Post(':id/chat')
  async chatWithAgent(
    @Param('id') id: number,
    @Body() body: { message: string },
    @Req() req: UserRequest,
  ) {
    // req.user is the payload parsed from the JWT
    const userId = req.user.userId;
    const interaction = await this.agentsService.addInteraction(
      +id,
      userId,
      body.message,
    );
    return interaction;
  }

  // get the chat records from one of the chosen agents
  @Get(':id/chat')
  async getAgentInteractions(@Param('id') id: number) {
    return this.agentsService.getInteractions(+id);
  }
}
