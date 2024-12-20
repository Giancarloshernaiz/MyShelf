import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "@/Assets/SVG/Icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import instance from "@/axios/config";

interface Props {
	title: string;
	description: string;
	actualizar: any;
	submit: string;
	value: any;
	icon?: any;
	classname?: string;
}

export default function Modal({ title, description, submit, value, classname, icon, actualizar }: Props) {
	const { register, handleSubmit } = useForm();

	const [selectedImage, setSelectedImage]: any = useState(null);
	const [imageUrl, setImageUrl]: any = useState(null);
	const [error, setError]:any = useState(false);

	const formRef = useRef(null);

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	useEffect(() => {
		if(error){
			setInterval(() => {
				setError(false);
			}, 3000)
		}
	}, [error])

	const onSubmit = (data:any) => {

		if (data.birthDate === ''){
			return setError(true);
		}

		console.log(data.birthDate.split('-'));
		const autor = `${data.firstName} ${data.lastName} (${data.birthDate.split('-')[0]}-${data.deathDate? data.deathDate.split('-')[0] : 'Actualidad'})`;

		data = {
			autores: autor,
			genero: data.genre,
			titulo: data.title,
			calificacion: data.rating,
			imagen: selectedImage.name,
			fecha_publicacion: data.publishDate
		}
		instance.post('/libros', data).then((res) => { setError(false); actualizar();}).catch((err) => {console.log(err);setError(true)})
		formRef.current.reset();
	};

	return (
		<Dialog>
			<DialogTrigger asChild className={classname}>
				<div>
					{value}
					{icon}
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[70%] h-[80vh]">
				<DialogHeader className="px-3">
					<DialogTitle className="flex-1 text-center p-2 text-3xl">{title}</DialogTitle>
					<DialogDescription className="flex-1 text-pretty">{description}</DialogDescription>
				</DialogHeader>
				<ScrollArea>
					<form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
						<div className="flex flex-col flex-wrap justify-center content-center text-pretty text-center  space-y-12">
							<div className="border-b border-gray-900/10 pb-12">
								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="col-span-full">
										<label className="text-base font-semibold leading-7 text-gray-900" htmlFor="file">
											Portada del libro
										</label>
										<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
											<div className="text-center">
												<svg
													className="mx-auto h-12 w-12 text-gray-300"
													viewBox="0 0 24 24"
													fill="currentColor"
													aria-hidden="true"
												>
													<path
														fillRule="evenodd"
														d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
														clipRule="evenodd"
													/>
												</svg>
												<div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
													<label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
														<span>Subir un archivo o arrastra y suelta aquí</span>
													</label>
													<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 10MB</p>
													<Input
														accept="image/*"
														type="file"
														onChange={(e: any) => setSelectedImage(e.target.files[0])}
													/>
													{imageUrl && <img src={imageUrl} alt="Selected" height="50px" />}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label className="text-base font-semibold leading-7 text-gray-900" id="title" htmlFor="title">
									Título
								</label>
								<div className="flex justify-center mt-2 ">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-[60%]">
										<Input
											type="text"
											id="title"
											autoComplete="title"
											className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											{...register("title")}
										/>
									</div>
								</div>
							</div>

							<div className="border-b border-gray-900/10 pb-12">
								<h2 className="text-base font-semibold leading-7 text-gray-900">Autor</h2>
								<p className="mt-1 text-sm leading-6 text-gray-600">
									Ingrese los datos del autor del libro, en caso de ser más de uno agregarlo.
								</p>

								<div className="flex mt-8 items-center gap-4">
									<div>
										<label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="first-name">
											Nombre
										</label>
										<div className="mt-2">
											<Input
												type="text"
												id="first-name"
												autoComplete="given-name"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												{...register("firstName")}
											/>
										</div>
									</div>

									<div>
										<label className="block text-sm font-medium leading-6 text-gray-900" htmlFor="last-name">
											Apellido
										</label>
										<div className="mt-2">
											<Input
												type="text"
												id="last-name"
												autoComplete="family-name"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												{...register("lastName")}
											/>
										</div>
									</div>
									<div>
										<label htmlFor="birth-date" className="block text-sm font-medium leading-6 text-gray-900">
											Fecha de nacimiento
										</label>
										<div className="mt-2">
											<Input
												id="birth-date"
												type="date"
												autoComplete="birth-date"
												className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												{...register("birthDate")}
											/>
										</div>
									</div>
									<div>
										<label htmlFor="death-date" className="block text-sm font-medium leading-6 text-gray-900">
											Fecha de fallecimiento
										</label>
										<div className="mt-2">
											<Input
												id="death-date"
												type="date"
												autoComplete="death-date"
												className=" w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												{...register("deathDate")}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label className="text-base font-semibold leading-7 text-gray-900" htmlFor="genre">
									Género
								</label>
								<div className="flex justify-center content-center mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-[60%]">
										<Input
											type="text"
											id="genre"
											autoComplete="genre"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											{...register("genre")}
										/>
									</div>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label className="text-base font-semibold leading-7 text-gray-900" htmlFor="publish-date">
									Fecha de publicación
								</label>
								<div className="flex justify-center content-center mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-[60%]">
										<Input
											type="date"
											id="publish-date"
											autoComplete="publish-date"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											{...register("publishDate")}
										/>
									</div>
								</div>
							</div>

							<div className="sm:col-span-4 pb-12">
								<label className="text-base font-semibold leading-7 text-gray-900" htmlFor="rating">
									Valoración
								</label>
								<div className="flex justify-center content-center mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-[60%]">
										<Input
											type="number"
											id="rating"
											autoComplete="rating"
											className="block flex-1 w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											{...register("rating")}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center">
							<Button type="submit">{submit}</Button>
							{error? <span>Datos invalidos</span> : null}
						</div>
					</form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
