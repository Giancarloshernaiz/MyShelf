import * as React from "react";

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
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Payment, columns } from "./colums";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function getData(): Promise<Payment[]> {
	return [
		{
			id: "1",
			cover: "Shoe Dog.jpg",
			name: "Shoe Dog: A Memoir by the Creator of Nike",
			author: "Phil Knight",
			genre: "Startups and Business",
			date: "04/26/2016",
			publisher: "Scribner",
			rating: "4.46",
		},
		{
			id: "2",
			cover: "Almanack.png",
			name: "The Almanack of Naval Ravikant: A Guide to Wealth and Happiness",
			author: "Eric Jorgenson",
			genre: "Philosophy And Psychology",
			date: "04/26/2020",
			publisher: "Scribner",
			rating: "4.64",
		},
		{
			id: "3",
			cover: "Behave.jpg",
			name: "Behave: The Biology of Humans at Our Best and Worst",
			author: "Eric Jorgenson",
			genre: "Philosophy And Psychology",
			date: "04/26/2020",
			publisher: "Scribner",
			rating: "4.42",
		},
		{
			id: "4",
			cover: " ",
			name: "The Almanack of Naval Ravikant: A Guide to Wealth and Happiness",
			author: "Eric Jorgenson",
			genre: "Philosophy And Psychology",
			date: "04/26/2020",
			publisher: "Scribner",
		},
	];
}

const data = await getData();
export default function DataTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className="w-full flex flex-col justify-center items-center px-20 py-6 font-medium ">
			<div className="min-w-full flex items-center py-4">
				<Input
					placeholder="Buscar por nombre o autor..."
					value={
						(table.getColumn("name")?.getFilterValue() as string) ?? table.getColumn("author")?.getFilterValue() ?? ""
					}
					onChange={(event: { target: { value: any } }) =>
						table.getColumn("name")?.setFilterValue(event.target.value) ||
						table.getColumn("author")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Ocultar
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
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
