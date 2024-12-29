"use client";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { User } from "@nextui-org/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function UserAccount() {
	const { data, status } = useSession();
	const router = useRouter();

	if (status == "loading") {
		return <p>Loading...</p>;
	}

	if (status == "unauthenticated" || !data || !data.user) {
		return <>Error</>;
	}

	const user = data.user;

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button variant="light" size="lg">
					<User
						name={user.name ?? "unknown"}
						description={user.role}
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
					onClick={() => router.push("/user/settings")}
				>
					Settings
				</DropdownItem>
				<DropdownItem
					key="singout"
					variant="solid"
					color="danger"
					className="text-danger"
					onClick={() => router.push("/user/signout")}
				>
					Sing Out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
