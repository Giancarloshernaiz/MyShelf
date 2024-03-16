"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Props {
	trigger: string;
	title: string;
	icon?: any;
	description?: string;
	action_bool: boolean;
	action_message?: string;
}

export default function ToastWithAction({ trigger, title, description, action_bool, action_message, icon }: Props) {
	const { toast } = useToast();

	return (
		<div
			className="p-1 w-full cursor-pointer hover:bg-slate-200/60 flex gap-4"
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
			{icon}
		</div>
	);
}
