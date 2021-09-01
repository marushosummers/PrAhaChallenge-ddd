import * as faker from 'faker'
import { Team } from 'src/domain/entities/Team'
import { prisma } from '@testUtil/prisma'

export const seedTeam = async (params: {
  id?: string
  name?: number
}) => {
  const { id, name } = params
  const teamEntity = new Team({
    id: id ?? faker.datatype.uuid(),
    name: name ?? 100,
  })
  await prisma.team.create({
    data: {
      ...teamEntity.getAllProperties(),
    },
  })
}
