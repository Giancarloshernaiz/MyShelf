"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

interface Props {
	trigger: string;
	title: string;
	description?: string;
	action_bool: boolean;
	action_message?: string;
}

export default function ToastWithAction({ trigger, title, description, action_bool, action_message }: Props) {
	const { toast } = useToast();

	return (
		<DropdownMenuItem
			className="p-1 cursor-pointer hover:bg-slate-200/60"
			onClick={() => {
				action_bool
					? toast({
							title: title,
							description: description,
							action: <Button onClick={() => {}}>{action_message}</Button>,
					  })
					: toast({
							title: title,
							description: description,
					  });
			}}
		>
			{trigger}
		</DropdownMenuItem>
	);
}
