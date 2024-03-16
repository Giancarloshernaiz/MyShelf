"use client";

import { Gmail, Instagram, X } from "./Assets/SVG/Redes";

import Table from "./Table/DataTable";
import { Toaster } from "./components/ui/toaster";

export default function App() {
	// const [books, setBooks] = useState([
	// 	{
	// 		id: "1",
	// 		cover: "Shoe Dog.jpg",
	// 		name: "Shoe Dog: A Memoir by the Creator of Nike",
	// 		author: "Phil Knight (1938-Actualidad)",
	// 		genre: "Startups and Business",
	// 		date: "26/04/2016",
	// 		publisher: "Simon & Schuster",
	// 		rating: "4.46",
	// 	},
	// 	{
	// 		id: "2",
	// 		cover: "Almanack.png",
	// 		name: "The Almanack of Naval Ravikant: A Guide to Wealth and Happiness",
	// 		author: "Eric Jorgenson (1991-Actualidad)",
	// 		genre: "Philosophy And Psychology",
	// 		date: "15/08/2020",
	// 		publisher: "Magrathea Publishing",
	// 		rating: "4.64",
	// 	},
	// 	{
	// 		id: "3",
	// 		cover: "Behave.jpg",
	// 		name: "Behave: The Biology of Humans at Our Best and Worst",
	// 		author: "Robert M. Sapolsky (1957-Actualidad)",
	// 		genre: "Science and Medicine",
	// 		date: "02/05/2017",
	// 		publisher: "Penguin Books",
	// 		rating: "4.42",
	// 	},
	// 	{
	// 		id: "4",
	// 		cover: "Atomic.jpeg",
	// 		name: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
	// 		author: "James Clear (1986-Actualidad)",
	// 		genre: "Philosophy And Psychology",
	// 		date: "16/10/2018",
	// 		publisher: "Penguin Random House",
	// 		rating: "4.32",
	// 	},

	// 	{
	// 		id: "5",
	// 		cover: "Ego.jpeg",
	// 		name: "Ego Is the Enemy",
	// 		author: "Ryan Holiday (1987-Actualidad)",
	// 		genre: "Philosophy And Psychology",
	// 		date: "14/06/2016",
	// 		publisher: "Penguin Books",
	// 		rating: "4.12",
	// 	},
	// 	{
	// 		id: "6",
	// 		cover: "Thinking.jpeg",
	// 		name: "Thinking, Fast and Slow",
	// 		author: "Daniel Kahneman (1934-Actualidad)",
	// 		genre: "Philosophy And Psychology",
	// 		date: "25/10/2011",
	// 		publisher: "Farrar, Straus and Giroux",
	// 		rating: "4.09",
	// 	},
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
	// ]);

	// const [bookToEdit, setBookToEdit] = useState(null);

	// const handleDeleteBook = (targetIndex: any) => {
	// 	setBooks(books.filter((_, idx) => idx !== targetIndex));
	// };

	// const handleEditBook = (idx: any) => {
	// 	setBookToEdit(idx);
	// };

	// const handleSubmit = (newBook: any) => {
	// 	bookToEdit === null
	// 		? setBooks([...books, newBook])
	// 		: setBooks(
	// 				books.map((currBook, idx) => {
	// 					if (idx !== bookToEdit) return currBook;

	// 					return newBook;
	// 				})
	// 		  );
	// };

	return (
		<>
			<main>
				<header className="relative flex flex-col justify-center content-between">
					<nav className="fixed overflow-hidde backdrop-blur-lg top-0 right-0 z-10 p-5  outline-2 outline-offset-0 outline-black/10 rounded-md rounded-t-none rounded-r-none">
						<ul className="flex justify-around content-end font-semibold sm:text-lg text-medium gap-5">
							<li className="rounded-sm hover:bg-black/25 py-2 sm:px-4 px-2">Home</li>
							<li className="rounded-sm hover:bg-black/25 py-2 sm:px-4 px-2">About</li>
							<li className="rounded-sm hover:bg-black/25 py-2 sm:px-4 px-2">Log in</li>
							<li className="rounded-sm hover:bg-black/35 bg-black/10 py-2 sm:px-4 px-2">Sing up</li>
						</ul>
					</nav>
					<div className="relative flex justify-center mt-10">
						<img src="./Logo_MyShelf.png" alt="Logo principal MyShelf" />
					</div>
				</header>
				<section className="flex flex-col justify-center content-center">
					<h1 className="font-semibold text-2xl text-gray-500 text-center">
						Libros que cambian vidas. Historias que te marcarán...
					</h1>
					<Table />
					<Toaster />
				</section>
				<footer className="relative flex flex-col bg-black/15 backdrop-blur-sm gap-4 w-full bottom-0 h-[40vh]">
					<div className="flex justify-between content-center px-12 mt-4">
						<img src="./Logo_variant.png" alt="Logo principal MyShelf" />
						<div id="redes" className="flex gap-8 px-2 pt-10">
							<a href="/" className="hover:opacity-70 hover:-translate-y-0.5">
								<Instagram />
							</a>
							<a href="/" className="hover:opacity-70 hover:-translate-y-0.5">
								<X />
							</a>
							<a href="/" className="hover:opacity-70 hover:-translate-y-0.5">
								<Gmail />
							</a>
						</div>
					</div>
					<div className="flex justify-between content-center px-12 ">
						<ul className="flex flex-col justify-end content-center text-pretty">
							<li>
								Correo electrónico: <a href="mailto:myshelf@gmail.com">myshelf@gmail.com</a>
							</li>
							<li>Número de teléfono: +1 800 123 4567 </li>
							<li>Dirección postal: San Diego, Edo. Carabobo, Venezuela</li>
						</ul>
						<div id="links" className="flex gap-4 p-2">
							<a href="/FAQ">FAQ</a>
							<a href="/Blog">Blog</a>
							<a href="/Politica-de-privacidad">Política de privacidad</a>
						</div>
					</div>
					<p className="text-center text-sm text-gray-900">© 2024 MyShelf. Todos los derechos reservados.</p>
				</footer>
			</main>
		</>
	);
}
