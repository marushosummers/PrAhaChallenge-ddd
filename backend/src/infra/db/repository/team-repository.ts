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
            members: true,
          },
        },
      },
    })
    return allTeams.map(
      (TeamDM) =>
        new Team({
          id: TeamDM.id,
          name: TeamDM.name,
          pairs: TeamDM.pairs.map(
            (pair) =>
              new Pair({
                id: pair.id,
                name: pair.name,
                memberIds: pair.members.map((member) => member.id),
              }),
          ),
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
            members: true,
          },
        },
      },
      where: {
        id: id,
      },
    })

    if (!team) {
      return null
    }

    return new Team({
      id: team.id,
      name: team.name,
      pairs: team.pairs.map(
        (pair) =>
          new Pair({
            id: pair.id,
            name: pair.name,
            memberIds: pair.members.map((member) => member.id),
          }),
      ),
    })
  }

  public async getByName(name: number): Promise<Team | null> {
    const team = await this.prismaClient.team.findUnique({
      include: {
        pairs: {
          select: {
            id: true,
            name: true,
            members: true,
          },
        },
      },
      where: {
        name: name,
      },
    })

    if (!team) {
      return null
    }

    return new Team({
      id: team.id,
      name: team.name,
      pairs: team.pairs.map(
        (pair) =>
          new Pair({
            id: pair.id,
            name: pair.name,
            memberIds: pair.members.map((member) => member.id),
          }),
      ),
    })
  }

  public async getByPairId(pairId: string): Promise<Team | null> {
    const pair = await this.prismaClient.pair.findUnique({
      include: {
        team: true,
      },
      where: {
        id: pairId,
      },
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
            members: true,
          },
        },
      },
      where: {
        id: pair.teamId,
      },
    })

    if (!team) {
      return null
    }

    const TeamEntity = new Team({
      id: team.id,
      name: team.name,
      pairs: team.pairs.map(
        (pair) =>
          new Pair({
            id: pair.id,
            name: pair.name,
            memberIds: pair.members.map((member) => member.id),
          }),
      ),
    })

    return TeamEntity
  }

  public async getByMemberId(memberId: string): Promise<Team | null> {
    const member = await this.prismaClient.member.findUnique({
      include: {
        pair: true,
      },
      where: {
        id: memberId,
      },
    })

    if (!member || !member.pair) {
      return null
    }

    const team = await this.prismaClient.team.findUnique({
      include: {
        pairs: {
          select: {
            id: true,
            name: true,
            members: true,
          },
        },
      },
      where: {
        id: member.pair.teamId,
      },
    })

    if (!team) {
      return null
    }

    const TeamEntity = new Team({
      id: team.id,
      name: team.name,
      pairs: team.pairs.map(
        (pair) =>
          new Pair({
            id: pair.id,
            name: pair.name,
            memberIds: pair.members.map((member) => member.id),
          }),
      ),
    })

    return TeamEntity
  }

  public async save(team: Team): Promise<void> {
    const { id, name, pairs } = team.getAllProperties()

    const savedTeam = await this.prismaClient.team.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    })

    const savedPairs = await Promise.all(
      pairs.map(async (pair) => {
        const savedPair = await this.prismaClient.pair.upsert({
          where: {
            id: pair.id,
          },
          update: {
            name: pair.name,
            teamId: id,
          },
          create: {
            id: pair.id,
            name: pair.name,
            teamId: id,
          },
        })

        // TODO: Memberの所属は別テーブルで持った方が綺麗
        const savedMembers = await Promise.all(
          pair.getAllProperties().memberIds.map(async (memberId) => {
            const savedMember = await this.prismaClient.member.update({
              where: {
                id: memberId,
              },
              data: {
                pairId: pair.id,
              },
            })
            return savedMember
          }),
        )
        return savedMembers
      }),
    )
  }

  public async deleteById(id: string): Promise<void> {
    const deletePair = this.prismaClient.pair.deleteMany({
      where: { teamId: id },
    })
    const deleteTeam = this.prismaClient.team.delete({ where: { id: id } })
    await this.prismaClient.$transaction([deletePair, deleteTeam])
  }
}
