import { Carrot, ChartNoAxesCombined, ShieldUser, Users2 } from "lucide-react"

export const adminNav = [

  {
    title: "المسؤل",
    href: "/admin",
    icon: ShieldUser
  },
  {
    title: "الأشخاص",
    href: "/admin/users",
    icon: Users2
  },
  {
    title: "المنتجات",
    href: "/admin/products",
    icon: Carrot
  },
  {
    title: "التحليلات",
    href: "/admin/charts",
    icon: ChartNoAxesCombined
  },

]