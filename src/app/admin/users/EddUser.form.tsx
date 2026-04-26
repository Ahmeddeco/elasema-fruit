"use client"

import Form from "next/form"
import { useActionState } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { UploadOneImagesDropZone } from "@/components/shared/UploadImagesDropZone"
import SubmitButton from "@/components/shared/SubmitButton"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Phone from "@/components/shared/Phone"
import CountryInput from "@/components/shared/CountryInput"
import { editUserAction } from "@/app/admin/users/user.action"
import { parseWithZod } from "@conform-to/zod"
import { useForm } from "@conform-to/react"
import UserSchema, { User } from "@/app/admin/users/User.schema"
import { Role } from "@/generated/prisma/enums"

type Props = {
	user: User
}

export default function EditUserForm({ user }: Props) {
	const [lastResult, action] = useActionState(editUserAction, undefined)
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: UserSchema })
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	})

	return (
		<Form id={form.id} action={action} onSubmit={form.onSubmit} className="space-y-6">
			{/* --------------------------------- name -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.name.name}>الاسم بالكامل</FieldLabel>
				<Input
					type="text"
					key={fields.name.key}
					name={fields.name.name}
					defaultValue={user.name}
					placeholder="أحمد محمد"
				/>
				<FieldError>{fields.name.errors}</FieldError>
			</Field>

			{/* -------------------------------- email -------------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.email.name}>الايميل</FieldLabel>
				<Input
					type="email"
					key={fields.email.key}
					name={fields.email.name}
					defaultValue={user.email}
					placeholder="email@example.com"
				/>
				<FieldError>{fields.email.errors}</FieldError>
			</Field>

			<div className="flex lg:flex-row flex-col items-center justify-center gap-8">
				{/* --------------------------------- role -------------------------------- */}

				<Field>
					<FieldLabel htmlFor={fields.role.name}>الدور</FieldLabel>
					<Select key={fields.role.key} name={fields.role.name} defaultValue={user.role}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{Object.values(Role).map((degreeProgram) => (
								<SelectItem value={degreeProgram} key={degreeProgram}>
									{degreeProgram}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FieldError>{fields.role.errors}</FieldError>
				</Field>

				{/* ----------------------------- mainMobile ------------------------------ */}
				<Phone
					key={fields.mainMobile.key}
					name={fields.mainMobile.name}
					defaultValue={user.mainMobile ?? ""}
					errors={fields.mainMobile.errors}
					label="الهاتف الرئيسي"
				/>

				{/* --------------------------- secondaryMobile --------------------------- */}
				<Phone
					key={fields.secondaryMobile.key}
					name={fields.secondaryMobile.name}
					defaultValue={user.secondaryMobile ?? ""}
					errors={fields.secondaryMobile.errors}
					label="الهاتف الثانوي"
				/>
			</div>

			<CountryInput cityName={fields.city.name} stateName={fields.state.name} countryName={fields.country.name} />

			{/* --------------------------- detailedAddress --------------------------- */}
			<Field>
				<FieldLabel htmlFor={fields.detailedAddress.name}>العنوان بالتفصيل</FieldLabel>
				<Textarea
					key={fields.detailedAddress.key}
					name={fields.detailedAddress.name}
					defaultValue={user.detailedAddress ?? ""}
				/>
				<FieldError>{fields.detailedAddress.errors}</FieldError>
			</Field>

			{/* ---------------------------------- image --------------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.image.name}
				imageKey={fields.image.key}
				errors={fields.image.errors}
				dbImage={user.image ?? ""}
				label="صورة المستخدم"
			/>

			{/* ----------------------------- personalId ----------------------------- */}
			<UploadOneImagesDropZone
				imageName={fields.personalId.name}
				imageKey={fields.personalId.key}
				errors={fields.personalId.errors}
				dbImage={user.personalId ?? ""}
				label="صورة البطاقة الشخصية"
			/>

			{/* ------------------------------ SubmitButton ------------------------------ */}
			<SubmitButton text={"عدل المستخدم"} />
		</Form>
	)
}
