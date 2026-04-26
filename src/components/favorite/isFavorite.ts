import { getSession } from "@/auth/getSession"
import prisma from "@/lib/prisma"

export const isFavorite = async (productId: string) => {
  const session = await getSession()
  if (!session) return false
  if (session.user.id) {
    const favoriteEntry = await prisma.favorite.findFirst({
      where: { productId, userId: session.user.id }
    })
    return !!favoriteEntry
  }
}