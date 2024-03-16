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
import { useState, useEffect } from "react";
import instance from "@/axios/config";


export default function DataTable() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [data, setData] = useState<Books[]>([]);

	useEffect(() => {
		instance.get("/libros").then((response) => {
			setData(response.data);
		});
	}, []);

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

	return (
		<div className="w-full flex flex-col justify-center items-center px-20 py-6 font-medium ">
			<div className="min-w-full flex items-center justify-between gap-5 py-4">
				<Input
					placeholder="Buscar por nombre o autor..."
					type="text"
					value={
						(table.getColumn("titulo")?.getFilterValue() as string) ||
						// (table.getColumn("author")?.getFilterValue() as string) ||
						""
					}
					onChange={(event: { target: { value: any } }) => {
						table.getColumn("titulo")?.setFilterValue(event.target.value || undefined);
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
