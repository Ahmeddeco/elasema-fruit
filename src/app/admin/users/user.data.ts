import { Role } from "@/generated/prisma/enums"
import prisma from "@/lib/prisma"

/* ------------------------------- getOneUser ------------------------------- */
export const getOneUser = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id }
    })
    return user
  } catch (error) {
    console.error(error)
  }
}

/* ------------------------- getAllUsersForUsersPage ------------------------ */
export const getAllUsersForUsersPage = async (size: number, page: number, role?: Role) => {
  try {
    const totalStudents = await prisma.user.count()
    const totalPages = Math.ceil(totalStudents / size)

    const data = await prisma.user.findMany({
      where: { role: role },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        mainMobile: true,
        country: true,
        state: true,
        city: true,
        role: true,
      },
      orderBy: { name: "asc" },
      take: size,
      skip: (page * size) - size,
    })
    return { data, totalPages }
  } catch (error) {
    console.error(error)
  }
}