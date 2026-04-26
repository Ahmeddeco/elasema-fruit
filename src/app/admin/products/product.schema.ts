import ProductTypeSchema from '@/generated/inputTypeSchemas/ProductTypeSchema'
import UnitSchema from '@/generated/inputTypeSchemas/UnitSchema'
import { z } from 'zod'

export const ProductSchema = z.object({
  unit: UnitSchema,
  type: ProductTypeSchema,
  id: z.string().nullish(),
  name: z.string(),
  description: z.string().nullish(),
  price: z.number(),
  discount: z.number().nullish(),
  stock: z.number(),
  lowerLimit: z.number().nullish(),
})

export type Product = z.infer<typeof ProductSchema>

export default ProductSchema
