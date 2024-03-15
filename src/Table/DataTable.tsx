import * as React from "react";

import { Books, columns } from "./colums";
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/Form/Modal";
import { Plus } from "@/Assets/SVG/Icons";

function capitalizeFirstLetter(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getData(): Promise<Books[]> {
	return [
		{
			id: "1",
			cover: "Shoe Dog.jpg",
			name: "Shoe Dog: A Memoir by the Creator of Nike",
			author: "Phil Knight (1938-Actualidad)",
			genre: "Startups and Business",
			date: "26/04/2016",
			publisher: "Simon & Schuster",
			rating: "4.46",
		},
		{
			id: "2",
			cover: "Almanack.png",
			name: "The Almanack of Naval Ravikant: A Guide to Wealth and Happiness",
			author: "Eric Jorgenson (1991-Actualidad)",
			genre: "Philosophy And Psychology",
			date: "15/08/2020",
			publisher: "Magrathea Publishing",
			rating: "4.64",
		},
		{
			id: "3",
			cover: "Behave.jpg",
			name: "Behave: The Biology of Humans at Our Best and Worst",
			author: "Robert M. Sapolsky (1957-Actualidad)",
			genre: "Science and Medicine",
			date: "02/05/2017",
			publisher: "Penguin Books",
			rating: "4.42",
		},
		{
			id: "4",
			cover: "Atomic.jpeg",
			name: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
			author: "James Clear (1986-Actualidad)",
			genre: "Philosophy And Psychology",
			date: "16/10/2018",
			publisher: "Penguin Random House",
			rating: "4.32",
		},

		{
			id: "5",
			cover: "Ego.jpeg",
			name: "Ego Is the Enemy",
			author: "Ryan Holiday (1987-Actualidad)",
			genre: "Philosophy And Psychology",
			date: "14/06/2016",
			publisher: "Penguin Books",
			rating: "4.12",
		},
		{
			id: "6",
			cover: "Thinking.jpeg",
			name: "Thinking, Fast and Slow",
			author: "Daniel Kahneman (1934-Actualidad)",
			genre: "Philosophy And Psychology",
			date: "25/10/2011",
			publisher: "Farrar, Straus and Giroux",
			rating: "4.09",
		},
		// {
		// 	id: "7",
		// 	cover: "Rich.jpeg",
		// 	name: "Rich Dad, Poor Dad",
		// 	author: "Robert T. Kiyosaki (1947-Actualidad)",
		// 	genre: "Startups and Business",
		// 	date: "08/04/1997",
		// 	publisher: "Plata Publishing, LLC.",
		// 	rating: "3.95",
		// },
	];
}

export const data = await getData();
export default function DataTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		data,
		columns,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});
	const handleDelete = (id: any) => {
		var index = data
			.map(function (e) {
				return e.id;
			})
			.indexOf(id);
		data.splice(index, 1);
	};
	return (
		<div className="w-full flex flex-col justify-center items-center px-20 py-6 font-medium ">
			<div className="min-w-full flex items-center justify-between gap-5 py-4">
				<Input
					placeholder="Buscar por nombre o autor..."
					type="text"
					value={
						(table.getColumn("name")?.getFilterValue() as string) ||
						// (table.getColumn("author")?.getFilterValue() as string) ||
						""
					}
					onChange={(event: { target: { value: any } }) => {
						table.getColumn("name")?.setFilterValue(event.target.value || undefined);
						// table.getColumn("author")?.setFilterValue(event.target.value || undefined);
					}}
					className="max-w-sm"
				/>

				<Modal
					title="Crear"
					description={
						"Por favor, ingrese la información detallada del libro. Asegúrese de rellenar todos los datos necesarios para garantizar la exactitud."
					}
					submit="Agregar"
					value={<Plus dimensions={28} />}
					classname="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-2 py-1"
				/>
			</div>
			<div className="min-w-full rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No existen resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<Button onClick={() => console.log(data)}>Prueba</Button>
			</div>
			<div className="min-w-full flex items-center justify-between space-x-2 py-4 px-2">
				<div className="flex-1 justify-between text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s)
					seleccionadas.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="lg"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button variant="outline" size="lg" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						Siguiente
					</Button>
				</div>
			</div>
		</div>
	);
}
