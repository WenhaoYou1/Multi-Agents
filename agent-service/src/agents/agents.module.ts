import { Module } from '@nestjs/common';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { AgentInteraction } from './agent-interaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agent, AgentInteraction])],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
