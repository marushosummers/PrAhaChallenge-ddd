import * as faker from 'faker'
import { Team } from 'src/domain/entities/Team'
import { prisma } from '@testUtil/prisma'

export const seedTeam = async (params: {
  id?: number
  name?: string
}) => {
  const { id, name } = params
  const teamEntity = new Team({
    id: id ?? 1,
    name: name ?? "hoge",
  })
  await prisma.team.create({
    data: {
      ...teamEntity.getAllProperties(),
    },
  })
}
