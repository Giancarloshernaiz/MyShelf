"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import instance from "@/axios/config";
import useCustomHook from "@/Table/hook";

interface Props {
	book: any;
	trigger: string;
	title: string;
	icon?: any;
	description?: string;
	action_bool: boolean;
	action_message?: string;
}

export default function ToastWithAction({ book, trigger, title, description, action_bool, action_message, icon }: Props) {
	const { toast } = useToast();
	const { actualizar } = useCustomHook();

	const createBook = (book: any) => {
		instance.post("/libros", book).then((response) => {
			console.log(response)
			actualizar()
		});
	};

	const deleteBook = (id: string) => {
		instance.delete(`/libros/${id}`).then((response:any) => {
			console.log(response)
			actualizar()
		});
	
	}

	return (
		<div
			className="p-1 w-full cursor-pointer hover:bg-slate-200/60 flex gap-4"
			onClick={() => {
				if(trigger === "Eliminar") deleteBook(book.id);

				action_bool
					? toast({
							title: title,
							description: description,
							action:
								<Button 
									onClick={() => {
										if(trigger === "Eliminar") createBook(book)
									}}
								>
									{action_message}
								</Button>,
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
