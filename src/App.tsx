import { useState } from 'react'
import ColorPalate from './components/ColorPalate'

type LogoProps = {
  className: string
  [key: string]: string
}

function Logo(props: LogoProps) {
  return (
    <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M34.32 6H13.68C9.44 6 6 9.44 6 13.68V34.32C6 38.56 9.44 42 13.68 42H34.32C38.56 42 42 38.56 42 34.32V13.68C42 9.44 38.56 6 34.32 6ZM8 34.32V33.04L19.84 21.24L21.28 22.68L8.2 35.72C8.08 35.28 8 34.8 8 34.32ZM8 30.24V27.36L16.96 18.4L18.4 19.84L8 30.24ZM8 24.52V21.68L14.12 15.56L15.56 17L8 24.52ZM8 18.84V15.96L11.24 12.72L12.68 14.16L8 18.84ZM9.04 10.44L9.88 11.28L8.08 13.08C8.12 12.08 8.48 11.2 9.04 10.44ZM9.08 37.64L22.64 24.08L24.08 25.52L10.56 39.08C10 38.68 9.48 38.2 9.08 37.64ZM12.56 39.88L25.52 26.92L26.96 28.36L15.4 39.88L15.52 40H13.68C13.28 40 12.92 39.96 12.56 39.88ZM37.56 38.96C36.92 39.4 36.16 39.72 35.36 39.88L36.92 38.32L37.56 38.96ZM32.52 39.88L32.64 40H29.52L34.04 35.48L35.48 36.92L32.52 39.88ZM26.92 40H23.84L31.2 32.64L32.64 34.08L26.8 39.88L26.92 40ZM21.24 40H18.12L28.36 29.76L29.8 31.2L21.12 39.88L21.24 40ZM40 34.32C40 35.52 39.6 36.64 38.96 37.56L10.44 9.04C11.36 8.4 12.48 8 13.68 8H34.32C37.44 8 40 10.56 40 13.68V34.32Z"
        fill="inherit"
      />
    </svg>
  )
}

function App() {
  const [currentColor, setCurrentColor] = useState<[number, number, number]>([14, 165, 233])
  const [currentMode, setCurrentMode] = useState<'rgb' | 'hex' | 'hsl' | 'hsb'>('hex')
  const [inputColor, setInputColor] = useState('#0EA5E9')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isModelOpen, setIsModelOpen] = useState(false)

  const modes = ['hex', 'rgb', 'hsl', 'hsb'] as const

  /* useEffect(() => {
		setCurrentColor([14, 165, 233]);
		setInputColor('#0EA5E9');
	}, [currentMode]); */

  /* function translateColor() {}

	function RGBToHSL(r: number, g: number, b: number) {
		// Make r, g, and b fractions of 1
		r /= 255;
		g /= 255;
		b /= 255;

		// Find greatest and smallest channel values
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;

		// Calculate hue
		// No difference
		if (delta === 0) h = 0;
		// Red is max
		else if (cmax === r) h = ((g - b) / delta) % 6;
		// Green is max
		else if (cmax === g) h = (b - r) / delta + 2;
		// Blue is max
		else h = (r - g) / delta + 4;

		h = Math.round(h * 60);

		// Make negative hues positive behind 360°
		if (h < 0) h += 360;

		// Calculate lightness
		l = (cmax + cmin) / 2;

		// Calculate saturation
		s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

		// Multiply l and s by 100
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);

		return [h, s, l];
	}
	function RGBToHSB(r: number, g: number, b: number) {} */

  function getColorLightness([r, g, b]: [number, number, number]) {
    r /= 255
    g /= 255
    b /= 255
    const cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b)
    let l = 0

    l = (cmax + cmin) / 2
    l = +(l * 100).toFixed(1)
    return l < 50
  }

  function handleChangeColor(color: string) {
    setInputColor(color)
    if (color.length < 7) return

    const r = parseInt(color.slice(1, 3), 16) || 0
    const g = parseInt(color.slice(3, 5), 16) || 0
    const b = parseInt(color.slice(5, 7), 16) || 0
    setCurrentColor([r, g, b])
  }

  return (
    <main
      className="h-screen w-screen transition-colors duration-300"
      style={{
        backgroundColor: `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`,
      }}>
      <div className={`${getColorLightness(currentColor) ? 'fill-white text-white' : 'fill-black text-black'} fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2 drop-shadow-md`}>
        <Logo className="size-20" />
        <h1 className="text-4xl">
          Background <br /> Changer
        </h1>
      </div>
      {/* Action Bar */}
      <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-between gap-3 rounded-full bg-slate-600 p-2">
        <button
          className="size-12 rounded-full"
          style={{
            backgroundColor: `rgb(${currentColor[0]},${currentColor[1]},${currentColor[2]})`,
          }}
          onClick={() => setIsModelOpen(true)}
        />
        <input
          value={inputColor}
          className="flex h-9 w-36 rounded-md bg-transparent text-2xl uppercase text-white shadow-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(e) => handleChangeColor(e.target.value)}
        />
        <div className="mr-3 text-right">
          <div className="relative inline-block text-left">
            <div>
              <button
                className="inline-flex w-[4.125rem] justify-center rounded-md bg-black/20 px-4 py-2 text-lg font-medium uppercase text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                onClick={() => setIsDropdownOpen(true)}>
                {currentMode}
              </button>
            </div>
            <ul
              className={`${
                !isDropdownOpen && 'invisible'
              } absolute bottom-16 right-0 mt-2 w-20 origin-top-right divide-y divide-gray-100/10 overflow-hidden rounded-md bg-slate-600 text-white shadow-lg ring-1 ring-black/5 focus:outline-none`}>
              {modes.map((mode) => (
                <li key={mode}>
                  <button
                    className={`${mode === currentMode ? 'bg-slate-700' : ''} group flex w-full items-center px-4 py-2 uppercase`}
                    onClick={() => {
                      setCurrentMode(mode)
                      setIsDropdownOpen(false)
                    }}>
                    {mode}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ColorPalate
        setSelectedColor={(value) => {
          handleChangeColor(value)
          setIsModelOpen(false)
        }}
        className={!isModelOpen ? 'invisible' : ''}
      />
    </main>
  )
}

export default App
