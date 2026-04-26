import ServerPageCard from "@/components/shared/ServerPageCard"
import AddUserForm from "@/app/admin/users/AddUser.form"
import { CircleChevronLeft } from "lucide-react"

export default function AddUsersPage() {
	return (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"أضف مستخدم"}
			description={"أضف مستخدم الى قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/admin/users"
		>
			<AddUserForm />
		</ServerPageCard>
	)
}
