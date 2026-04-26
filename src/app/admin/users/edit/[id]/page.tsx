import EmptyCard from "@/components/shared/EmptyCard"
import ServerPageCard from "@/components/shared/ServerPageCard"
import { CircleChevronLeft } from "lucide-react"
import EditUserForm from "../../EddUser.form"
import { getOneUser } from "../../user.data"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id
	const user = await getOneUser(id)

	return !user ? (
		<EmptyCard href={"/server/users/add"} linkTitle={"أضف مستخدم جديد"} />
	) : (
		<ServerPageCard
			icon={CircleChevronLeft}
			title={"عدل المستخدم"}
			description={"عدل المستخدم في قاعدة البيانات."}
			btnTitle={"الرجوع"}
			href="/admin/users"
		>
			<EditUserForm user={user!} />
		</ServerPageCard>
	)
}
