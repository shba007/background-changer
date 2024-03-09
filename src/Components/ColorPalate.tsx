import tailwindColors from 'tailwindcss/colors';

function ColorPalate({ setSelectedColor, className = '' }: { setSelectedColor: (color: string) => void; className?: string }) {
	const colorsToRemove = ['inherit', 'current', 'transparent', 'black', 'white', 'blueGray', 'coolGray', 'lightBlue', 'trueGray', 'warmGray'];
	const colors = Object.keys(tailwindColors).filter((color) => !colorsToRemove.includes(color));

	return (
		<div className={`flex justify-center items-center fixed w-screen h-screen bg-black/40 ${className}`}>
			<dialog open className="rounded-md py-4 w-fit aspect-[5/3] bg-slate-600 text-white">
				<div className="flex flex-col gap-2 p-4 h-full overflow-auto">
					{colors.map((color) => (
						<div key={color} className="">
							<span className="capitalize text-lg font-medium">{color}</span>
							<ul className="flex gap-2 mt-4">
								{
									// @ts-ignore
									Object.keys(tailwindColors[color]).map((shade) => (
										<button
											// @ts-ignore
											key={tailwindColors[color][shade]}
											className="inline-block rounded-lg size-14 focus:outline focus:outline-2 focus:outline-slate-950 focus:outline-offset-1"
											// @ts-ignore
											style={{ backgroundColor: tailwindColors[color][shade] }}
											// @ts-ignore
											onClick={() => setSelectedColor(tailwindColors[color][shade])}
										/>
									))
								}
							</ul>
						</div>
					))}
				</div>
			</dialog>
		</div>
	);
}

export default ColorPalate;
