// "use client";

// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "@radix-ui/react-dropdown-menu";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@radix-ui/react-checkbox";
// import { ColumnDef } from "@tanstack/react-table";

// export type Payment = {
// 	id: string;
// 	amount: number;
// 	status: "pending" | "processing" | "success" | "failed";
// 	email: string;
// };

// export const columns: ColumnDef<Payment>[] = [
// 	{
// 		id: "select",
// 		header: ({ table }) => (
// 			<Checkbox
// 				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
// 				onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
// 				aria-label="Select all"
// 			/>
// 		),
// 		cell: ({ row }) => (
// 			<Checkbox
// 				checked={row.getIsSelected()}
// 				onCheckedChange={(value: any) => row.toggleSelected(!!value)}
// 				aria-label="Select row"
// 			/>
// 		),
// 		enableSorting: false,
// 		enableHiding: false,
// 	},
// 	{
// 		accessorKey: "status",
// 		header: "Status",
// 		cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
// 	},
// 	{
// 		accessorKey: "email",
// 		header: ({ column }) => {
// 			return (
// 				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
// 					Email
// 				</Button>
// 			);
// 		},
// 		cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
// 	},
// 	{
// 		accessorKey: "amount",
// 		header: () => <div className="text-right">Amount</div>,
// 		cell: ({ row }) => {
// 			const amount = parseFloat(row.getValue("amount"));

// 			const formatted = new Intl.NumberFormat("en-US", {
// 				style: "currency",
// 				currency: "USD",
// 			}).format(amount);

// 			return <div className="text-right font-medium">{formatted}</div>;
// 		},
// 	},
// 	{
// 		id: "actions",
// 		enableHiding: false,
// 		cell: ({ row }) => {
// 			const payment = row.original;

// 			return (
// 				<DropdownMenu>
// 					<DropdownMenuTrigger asChild>
// 						<Button variant="ghost" className="h-8 w-8 p-0">
// 							<span className="sr-only">Open menu</span>
// 						</Button>
// 					</DropdownMenuTrigger>
// 					<DropdownMenuContent align="end">
// 						<DropdownMenuLabel>Actions</DropdownMenuLabel>
// 						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
// 							Copy payment ID
// 						</DropdownMenuItem>
// 						<DropdownMenuSeparator />
// 						<DropdownMenuItem>View customer</DropdownMenuItem>
// 						<DropdownMenuItem>View payment details</DropdownMenuItem>
// 					</DropdownMenuContent>
// 				</DropdownMenu>
// 			);
// 		},
// 	},
// ];

"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Empty, Filled, Half } from "../Assets/Stars.tsx";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
	id: string;
	name: string;
	author: string;
	genre: string;
	date: string;
	publisher: string;
	cover: string;
	rating?: string;
};

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: "cover",
		header: "Portada",
		cell: ({ row }) => (
			<div className="capitalize">
				<img src={`./src/Assets/${row.getValue("cover")}`} alt="Portada-del-libro" width={"100px"} />
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
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Autor
				</Button>
			);
		},
		cell: ({ row }) => <div className="capitalize">{row.getValue("author")}</div>,
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
		header: () => <div className="text-right">Valoración</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("rating")) || 0;
			const icon = amount < 3.5 ? <Empty /> : amount < 4.5 ? <Half /> : <Filled />;
			return (
				<div className="flex text-right font-medium gap-2">
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
			const payment = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
							Copy payment ID
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View customer</DropdownMenuItem>
						<DropdownMenuItem>View payment details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
