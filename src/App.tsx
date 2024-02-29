import { Gmail, Instagram, X } from "../public/Redes";

import Table from "./Table/DataTable";

export default function App() {
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
