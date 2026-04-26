'use server'

import { parseWithZod } from "@conform-to/zod"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import UserSchema from "@/app/admin/users/User.schema"

/* ------------------------------ addUserAction ----------------------------- */
export const addUserAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.user.upsert({
      where: { email: submission.value.email },
      create: {
        name: submission.value.name,
        email: submission.value.email,
        role: submission.value.role,
        mainMobile: submission.value.mainMobile,
        secondaryMobile: submission.value.secondaryMobile,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        detailedAddress: submission.value.detailedAddress,
        gps: submission.value.gps,
        image: submission.value.image,
        personalId: submission.value.image,
      },
      update: {
        name: submission.value.name,
        email: submission.value.email,
        role: submission.value.role,
        mainMobile: submission.value.mainMobile,
        secondaryMobile: submission.value.secondaryMobile,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        detailedAddress: submission.value.detailedAddress,
        gps: submission.value.gps,
        image: submission.value.image,
        personalId: submission.value.image,
      }
    })
  } catch (error) {
    console.error(error)
  }

  redirect("/admin/users")
}

/* ----------------------------- editUserAction ----------------------------- */
export const editUserAction = async (prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema: UserSchema,
  })
  if (submission.status !== 'success') {
    return submission.reply()
  }

  try {
    await prisma.user.update({
      where: { email: submission.value.email },
      data: {
        name: submission.value.name,
        email: submission.value.email,
        role: submission.value.role,
        mainMobile: submission.value.mainMobile,
        secondaryMobile: submission.value.secondaryMobile,
        country: submission.value.country,
        state: submission.value.state,
        city: submission.value.city,
        detailedAddress: submission.value.detailedAddress,
        gps: submission.value.gps,
        image: submission.value.image,
        personalId: submission.value.image,
      }
    })
  } catch (error) {
    console.error(error)
  }

  redirect("/admin/users")
}

/* ---------------------------- deleteUserAction ---------------------------- */
export const deleteUserAction = async (formData: FormData) => {
  try {
    const id = formData.get("id")
    await prisma.user.delete({
      where: { id: id as string },
    })
  } catch (error) {
    console.error(error)
  }
  redirect("/admin/users")
}