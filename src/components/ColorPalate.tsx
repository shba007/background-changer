import tailwindColors from 'tailwindcss/colors'

function ColorPalate({ setSelectedColor, className = '' }: { setSelectedColor: (color: string) => void; className?: string }) {
  const colorsToRemove = ['inherit', 'current', 'transparent', 'black', 'white', 'blueGray', 'coolGray', 'lightBlue', 'trueGray', 'warmGray']
  const colors = Object.keys(tailwindColors).filter((color) => !colorsToRemove.includes(color))

  return (
    <div className={`fixed flex h-screen w-screen items-center justify-center bg-black/40 ${className}`}>
      <dialog open className="aspect-[3/4] w-fit max-w-80 rounded-md bg-slate-600 py-4 text-white md:aspect-[5/3] md:max-w-full">
        <div className="flex h-full flex-col gap-2 overflow-auto p-4">
          {colors.map((color) => (
            <div key={color} className="">
              <span className="text-lg font-medium capitalize">{color}</span>
              <ul className="mt-4 flex gap-2">
                {
                  // @ts-expect-error color map exists
                  Object.keys(tailwindColors[color]).map((shade) => (
                    <button
                      // @ts-expect-error shade map exists
                      key={tailwindColors[color][shade]}
                      className="inline-block size-14 rounded-lg focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-slate-950"
                      // @ts-expect-error shade map exists
                      style={{ backgroundColor: tailwindColors[color][shade] }}
                      onClick={() =>
                        // @ts-expect-error shade map exists
                        setSelectedColor(tailwindColors[color][shade])
                      }
                    />
                  ))
                }
              </ul>
            </div>
          ))}
        </div>
      </dialog>
    </div>
  )
}

export default ColorPalate
