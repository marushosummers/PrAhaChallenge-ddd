import { Body, Controller, Param, Get, Patch } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamResponse } from './response/get-team-response'
import { GetTeamUseCase } from '../app/get-team-usecase'
import { PatchTeamRequest } from './request/patch-team-request'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { PatchTeamUseCase } from '../app/patch-team-usecase'
import { PrismaClient } from '@prisma/client'
import { TeamQS } from 'src/infra/db/query-service/team-qs'
import { Team } from '../domain/entities/Team'

@Controller('team')
export class TeamController {

  @Get()
  @ApiResponse({ status: 200, type: GetTeamResponse })
  async getTeam(): Promise<GetTeamResponse> {
    const prisma = new PrismaClient()
    const qs = new TeamQS(prisma)
    const usecase = new GetTeamUseCase(qs)
    const result = await usecase.do()
    const response = new GetTeamResponse({ teams: result })
    return response
  }

  @Patch('/:id')
  @ApiResponse({ status: 200, type: Team })
  @ApiResponse({ status: 500, description: "Internal Error"})
  async updateTeam(
    @Param('id') id: string,
    @Body() patchTeamDTO: PatchTeamRequest,
  ): Promise<Team> {
    const prisma = new PrismaClient()
    const repo = new TeamRepository(prisma)
    const usecase = new PatchTeamUseCase(repo)
    const result = await usecase.do({
      id: id,
      name: patchTeamDTO.name,
    })
    return result
  }
}

