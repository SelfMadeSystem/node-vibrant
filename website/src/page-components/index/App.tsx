import { useEffect, useState } from "react";
import { Title } from "../../components/title.tsx";
import styles from "./App.module.css";
import { Colors } from "./Colors";
import { Images } from "./Images";
import { BlobTitle } from "./blob-title.tsx";
import type { ChangeEvent } from "react";

const App = () => {
	const [image, setImage] = useState(Images.MountainLake);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const fileURL = URL.createObjectURL(event.target.files![0]);
		setImage(fileURL);
	};

	const onPaste = (event: ClipboardEvent) => {
		if (!event.clipboardData) return;
		const items = event.clipboardData.items;
		for (const item of items) {
			if (item.type.indexOf("image") === -1) continue;
			const blob = item.getAsFile();
			const fileURL = URL.createObjectURL(blob!);
			setImage(fileURL);
			return;
		}
	};

	useEffect(() => {
		const handlePaste = (event: ClipboardEvent) => onPaste(event);
		window.addEventListener("paste", handlePaste);
		return () => {
			window.removeEventListener("paste", handlePaste);
		};
	}, []);

	return (
		<div>
			<div className={styles.buttonContainer}>
				<a href="./guides/get-started" className={styles.button}>
					Get Vibrant
				</a>
			</div>

			<BlobTitle title={"Vibrant"} />

			<p>A Node.js and Browser compatible image color extraction library</p>

			<div className={styles.app}>
				<Colors file={image} className={styles.fullSize} />

				<div className={`${styles.fullSize} ${styles.flex}`}>
					<label htmlFor="file-upload" className={styles.button}>
						Upload or paste an image
					</label>
					<input id="file-upload" type="file" onChange={onChange} />
				</div>

				<div
					className={`${styles.fullSize} ${styles.flex}`}
					style={{
						padding: "6rem 0rem 4rem 0rem",
					}}
				>
					<Title title={"Examples"} />
				</div>

				<Colors file={Images.PeacockFeathers} />
				<Colors file={Images.IrelandPark} />
			</div>
		</div>
	);
};

export default App;
