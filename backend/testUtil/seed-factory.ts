import * as faker from 'faker'
import { prisma } from '@testUtil/prisma'

export const seedTeam = async (params: { id?: string; name?: number }) => {
  const { id, name } = params
  await prisma.team.create({
    data: {
      id: id ?? faker.datatype.uuid(),
      name: name ?? 1,
    },
  })
}

export const seedPair = async (params: {
  id?: string
  name?: string
  teamId: string
}) => {
  const { id, name, teamId } = params
  await prisma.pair.create({
    data: {
      id: id ?? faker.datatype.uuid(),
      name: name ?? 'a',
      teamId: teamId,
    },
  })
}

export const seedMember = async (params: {
  id?: string
  name?: string
  email?: string
  pairId: string
}) => {
  const { id, name, email, pairId } = params
  await prisma.member.create({
    data: {
      id: id ?? faker.datatype.uuid(),
      name: name ?? 'a',
      email: email ?? 'sample@sample.com',
      pairId: pairId,
    },
  })
}
