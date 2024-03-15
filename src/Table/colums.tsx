"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Empty, Filled, Half } from "../Assets/SVG/Stars.tsx";
import { Menu, SortArrow } from "../Assets/SVG/Icons.tsx";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card.tsx";
import { ColumnDef } from "@tanstack/react-table";
import Modal from "@/Form/Modal.tsx";
import Toast from "@/Form/Toast.tsx";
import { data } from "./DataTable.tsx";

export type Books = {
	id: string;
	name: string;
	author: string;
	genre: string;
	date: string;
	publisher: string;
	cover: string;
	rating?: string;
};

export const columns: ColumnDef<Books>[] = [
	{
		accessorKey: "id",
		header: "N°",
		cell: ({ row }) => <div className="capitalize text-slate-400">{row.getValue("id")}</div>,
	},
	{
		accessorKey: "cover",
		header: "Portada",
		cell: ({ row }) => (
			<div className="capitalize">
				<img src={`./src/Assets/Covers/${row.getValue("cover")}`} alt="Portada-del-libro" width={"100px"} />
			</div>
		),
	},
	{
		accessorKey: "name",
		header: "Nombre",
		cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "author",
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
		cell: ({ row }) => <div className="capitalize pl-4">{row.getValue("author")}</div>,
	},
	{
		accessorKey: "genre",
		header: "Género",
		cell: ({ row }) => <div className="capitalize">{row.getValue("genre")}</div>,
	},
	{
		accessorKey: "date",
		header: "Fecha de publicación",
		cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
	},
	{
		accessorKey: "publisher",
		header: "Editorial",
		cell: ({ row }) => <div className="capitalize">{row.getValue("publisher")}</div>,
	},
	{
		accessorKey: "rating",
		header: ({ column }) => (
			<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
				Valoración
			</Button>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("rating")) || parseFloat("0.0");
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
			const handleDelete = (id: string) => {
				var index = data
					.map(function (e) {
						return e.id;
					})
					.indexOf(id);
				data.splice(index, 1);
			};
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-10 w-10 p-0">
							<Menu />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="z-10">
						<Card className="outline outline-slate-300 outline-1 outline-offset-0">
							<DropdownMenuItem onClick={() => navigator.clipboard.writeText(books.name)} className="mt-4 mx-4">
								<Toast trigger="Copiar título del libro" title="¡Título copiado con éxito!" action_bool={false}></Toast>
							</DropdownMenuItem>
							<hr className="h-px mx-4 w-auto text-center bg-gray-700 border-0 m-1" />

							<DropdownMenuItem onClick={() => handleDelete(books.id)} className="mx-4">
								<Toast
									trigger="Eliminar"
									title="¡Libro eliminado con éxito!"
									action_bool={true}
									action_message="Deshacer"
								/>
							</DropdownMenuItem>

							<Modal
								title={"Editar Libro"}
								description={
									"Por favor, actualice la información del libro. Asegúrese de rellenar todos los datos necesarios para garantizar la exactitud."
								}
								submit={"Confirmar"}
								value={"Editar"}
								classname={"mx-4 mb-4 p-1 cursor-pointer hover:bg-slate-200/60"}
							/>
						</Card>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
