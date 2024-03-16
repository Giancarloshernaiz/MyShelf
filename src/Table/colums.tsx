"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Empty, Filled, Half } from "../Assets/SVG/Stars.tsx";
import { Menu, Pencil, SortArrow, Trashcan } from "../Assets/SVG/Icons.tsx";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card.tsx";
import { ColumnDef } from "@tanstack/react-table";
import Modal from "@/Form/Modal.tsx";
import Toast from "@/Form/Toast.tsx";
import useCustomHook from "./hook.tsx";

export type Books = {
	id: number;
	titulo: string;
	autores: string;
	genero: string;
	fecha_publicacion: string;
	//editorial: string;
	imagen: string;
	calificacion: string;
};


export const columns: ColumnDef<Books>[] = [
	{
		accessorKey: "id",
		header: "N°",
		cell: ({ row }) => <div className="capitalize text-slate-400">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "imagen",
		header: "Portada",
		cell: ({ row }) => (
			<div className="capitalize">
				<img src={`./src/Assets/Covers/${row.getValue("imagen")}`} alt="Portada-del-libro" width={"100px"} />
			</div>
		),
	},
	{
		accessorKey: "titulo",
		header: "Nombre",
		cell: ({ row }) => <div className="capitalize">{row.getValue("titulo")}</div>,
	},
	{
		accessorKey: "autores",
		header: ({ column }) => {
			return (
				<Button
					className="flex font-medium gap-2 pl-4"
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Autor <SortArrow />
				</Button>
			);
		},
		cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("autores")}</div>,
	},
	{
		accessorKey: "genero",
		header: "Género",
		cell: ({ row }) => <div className="capitalize">{row.getValue("genero")}</div>,
	},
	{
		accessorKey: "fecha_publicacion",
		header: "Fecha de publicación",
		cell: ({ row }) => <div className="capitalize">{row.getValue("fecha_publicacion")}</div>,
	},
	/*{
		accessorKey: "editorial",
		header: "Editorial",
		cell: ({ row }) => <div className="capitalize">{row.getValue("editorial")}</div>,
	}, */
	{
		accessorKey: "calificacion",
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				Valoración
			</Button>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("calificacion")) || parseFloat("0.0");
			const icon = amount < 3.5 ? <Empty /> : amount < 4.5 ? <Half /> : <Filled />;
			return (
				<div className="flex text-right font-medium gap-2 pl-4">
					{amount}
					{icon}
				</div>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const books = row.original;
			// const handleDelete = (id: string) => {
			// 	var index = data
			// 		.map(function (e: any) {
			// 			return e.id;
			// 		})
			// 		.indexOf(id);
			// 	data.splice(index, 1);
			// };
			const actualizar = useCustomHook();
			return (
				
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-10 w-10 p-0">
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="z-10">
						<Card className="outline outline-slate-300 outline-1 outline-offset-0">
							<DropdownMenuItem onClick={() => navigator.clipboard.writeText(books.titulo)} className="mt-4 mx-4">
								<Toast 
									book={books}
									trigger="Copiar título del libro"
									title="¡Título copiado con éxito!"
									action_bool={false} 
								/>
							</DropdownMenuItem>
							<hr className="h-px mx-4 w-auto text-center bg-gray-300 border-0 m-1" />
							<DropdownMenuItem
								onClick={() =>
									// handleDelete(books.id)
									""
								}
								className="flex gap-2 mx-4"
							>
								<Toast
									book={books}
									trigger="Eliminar"
									title="¡Libro eliminado con éxito!"
									action_bool={true}
									action_message="Deshacer"
									icon={<Trashcan />}
								/>
								
							</DropdownMenuItem>

							<Modal
								title={"Editar Libro"}
								description={
									"Por favor, actualice la información del libro. Asegúrese de rellenar todos los datos necesarios para garantizar la exactitud."
								}
								submit={"Confirmar"}
								value={"Editar"}
								classname={"mx-4 mb-4 p-1 cursor-pointer hover:bg-slate-200/60 flex gap-4"}
								icon={<Pencil />}
								actualizar={actualizar}
							/>
						</Card>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
