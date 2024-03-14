import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";

export default function () {
	const [selectedImage, setSelectedImage]: any = React.useState(null);
	const [imageUrl, setImageUrl]: any = React.useState(null);

	React.useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	return (
		<>
			<div className="w-full flex flex-col justify-center items-center px-20 py-6 font-medium ">
				<Card>
					<Input accept="image/*" type="file" onChange={(e: any) => setSelectedImage(e.target.files[0])} />
					{imageUrl && <img src={imageUrl} alt="Selected" height="100px" />}{" "}
				</Card>
			</div>
		</>
	);
}
