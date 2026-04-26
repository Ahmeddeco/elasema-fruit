// app/actions/favorite-actions.ts
"use server"

import { getSession } from "@/auth/getSession"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function toggleFavorite(productId: string) {
  const session = await getSession()

  if (!session) {
    throw new Error("يجب تسجيل الدخول لإضافة المنتج للمفضلة")
  }

  const userId = session.user.id

  try {
    // التحقق إذا كان المنتج موجود مسبقاً في المفضلة
    const existingFavorite = await prisma.favorite.findFirst({
      where: { userId, productId },
    })

    if (existingFavorite) {
      // إذا كان موجوداً، نقوم بحذفه (Toggle)
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      })
    } else {
      // إذا لم يكن موجوداً، نقوم بإضافته
      await prisma.favorite.create({
        data: { userId, productId },
      })
    }

    // تحديث البيانات في الصفحة دون الحاجة لإعادة التحميل
    revalidatePath("/products")
    return { success: true }
  } catch (error) {
    console.error("Favorite Error:", error)
    return { success: false }
  }
}