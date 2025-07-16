"use client";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { User } from "@nextui-org/user";
import { useSession } from "@/utils/auth-client";
import { useRouter } from "next/navigation";

export function UserAccount() {
	const { data, error, isPending } = useSession();
	const router = useRouter();

	if (isPending) {
		return <p>Loading...</p>;
	}

	if (error || !data || !data.user) {
		return <>Error</>;
	}

	const user = data.user;

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="light" size="lg">
					<User
						name={user.name ?? "unknown"}
						description={user.email}
						avatarProps={{
							showFallback: true,
							src: user.image ?? "",
							name: "",
						}}
					/>
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Static Actions">
				<DropdownItem
					key="settings"
					variant="flat"
					onPress={() => router.push("/user/settings")}
				>
					Settings
				</DropdownItem>
				<DropdownItem
					key="singout"
					variant="solid"
					color="danger"
					className="text-danger"
					onPress={() => router.push("/user/signout")}
				>
					Sing Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
