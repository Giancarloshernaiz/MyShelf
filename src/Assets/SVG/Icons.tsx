interface Props {
	dimensions: number;
}

export function Plus({ dimensions }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width={dimensions}
			height={dimensions}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect width="18" height="18" x="3" y="3" rx="2" />
			<path d="M8 12h8" />
			<path d="M12 8v8" />
		</svg>
	);
}

export function Trashcan() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 7l16 0" />
			<path d="M10 11l0 6" />
			<path d="M14 11l0 6" />
			<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
			<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
		</svg>
	);
}

export function Pencil() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="icon icon-tabler icons-tabler-outline icon-tabler-pencil"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
			<path d="M13.5 6.5l4 4" />
		</svg>
	);
}

export function SortArrow() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-arrows-sort"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M3 9l4 -4l4 4m-4 -4v14" />
			<path d="M21 15l-4 4l-4 -4m4 4v-14" />
		</svg>
	);
}

export function Menu() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-dots"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
			<path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
		</svg>
	);
}
