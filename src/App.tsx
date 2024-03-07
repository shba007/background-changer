import { useState } from 'react';

function App() {
	const [currentColor, setCurrentColor] = useState('white');

	return (
		<main className="w-screen h-screen duration-300" style={{ backgroundColor: currentColor }}>
			<div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex justify-between items-center gap-2 rounded-full p-2 bg-slate-600">
				<span className="rounded-full size-12" style={{ backgroundColor: currentColor }} />
				<input value={currentColor} className="w-min text-2xl text-white capitalize bg-transparent" onChange={(e) => setCurrentColor(e.target.value)} />
				<select className="text-white text-xl uppercase bg-transparent">
					<option>hex</option>
					<option>rgb</option>
					<option>hsl</option>
					<option>hsb</option>
				</select>
			</div>
		</main>
	);
}

export default App;
