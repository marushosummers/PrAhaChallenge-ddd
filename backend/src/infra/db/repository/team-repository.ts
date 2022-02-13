import { PrismaClient } from '@prisma/client'
import { ITeamRepository } from 'src/app/repository-interface/team-repository'
import { Pair, Team } from 'src/domain/entities/Team'

export class TeamRepository implements ITeamRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<Team[]> {
    const allTeams = await this.prismaClient.team.findMany({
      include: {
        pairs: {
          select: {
            id: true,
            name: true,
            members: true
          },
        },
      },
    })
    return allTeams.map(
      (TeamDM) =>
        new Team({
          id: TeamDM.id,
          name: TeamDM.name,
          pairs: TeamDM.pairs.map((pair) => new Pair({ id: pair.id, name: pair.name, memberIds: pair.members.map((member) => member.id) })),
        }),
    )
  }

  public async getById(id: string): Promise<Team | null> {
    const team = await this.prismaClient.team.findUnique({
      include: {
        pairs: {
          select: {
            id: true,
            name: true,
            members: true
          },
        },
      },
      where: {
        id: id,
      }
    })

    if (!team) {
      return null
    }

    return new Team({
      id: team.id,
      name: team.name,
      pairs: team.pairs.map((pair) => new Pair({ id: pair.id, name: pair.name, memberIds: pair.members.map((member) => member.id) }))
    })
  }

  public async getByName(name: number): Promise<Team | null> {
    const team = await this.prismaClient.team.findUnique({
      include: {
        pairs: {
          select: {
            id: true,
            name: true,
            members: true
          },
        },
      },
      where: {
        name: name
      }
    })

    if (!team) {
      return null
    }

    return new Team({
      id: team.id,
      name: team.name,
      pairs: team.pairs.map((pair) => new Pair({ id: pair.id, name: pair.name, memberIds: pair.members.map((member) => member.id) }))
    })
  }

  public async getByPairId(pairId: string): Promise<Team | null> {
    const pair = await this.prismaClient.pair.findUnique({
      include: {
        team: true,
      },
      where: {
        id: pairId,
      }
    })

    if (!pair) {
      return null
    }

    const team = await this.prismaClient.team.findUnique({
      include: {
        pairs: {
          select: {
            id: true,
            name: true,
            members: true
          },
        },
      },
      where: {
        id: pair.teamId,
      }
    })

    if (!team) {
      return null
    }

    const TeamEntity = new Team({
      id: team.id,
      name: team.name,
      pairs: team.pairs.map((pair) => new Pair({ id: pair.id, name: pair.name, memberIds: pair.members.map((member) => member.id) }))
    })

    return TeamEntity
  }

  public async save(team: Team): Promise<void> {
    const { id, name, pairs } = team.getAllProperties()

    const saveTeam = await this.prismaClient.team.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    })

    const savePairs = await Promise.all(pairs.map(async (pair) => {
      await this.prismaClient.pair.update({
        where: {
          id: pair.id,
        },
        data: {
          name: pair.name,
          teamId: id
        },
      })
      await Promise.all(pair.memberIds.map(async (memberId) => {
        this.prismaClient.member.update({
          where: {
            id: memberId,
          },
          data: {
            pairId: pair.id
          },
        })
      }))
    }))
  }
}
