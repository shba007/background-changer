import tailwindColors from 'tailwindcss/colors';

function ColorPalate({
  setSelectedColor,
  className = '',
}: {
  setSelectedColor: (color: string) => void;
  className?: string;
}) {
  const colorsToRemove = [
    'inherit',
    'current',
    'transparent',
    'black',
    'white',
    'blueGray',
    'coolGray',
    'lightBlue',
    'trueGray',
    'warmGray',
  ];
  const colors = Object.keys(tailwindColors).filter(
    (color) => !colorsToRemove.includes(color)
  );

  return (
    <div
      className={`flex justify-center items-center fixed w-screen h-screen bg-black/40 ${className}`}
    >
      <dialog
        open
        className="rounded-md py-4 w-fit max-w-80 md:max-w-full aspect-[3/4] md:aspect-[5/3] bg-slate-600 text-white"
      >
        <div className="flex flex-col gap-2 p-4 h-full overflow-auto">
          {colors.map((color) => (
            <div key={color} className="">
              <span className="capitalize text-lg font-medium">{color}</span>
              <ul className="flex gap-2 mt-4">
                {
                  // @ts-expect-error color map exists
                  Object.keys(tailwindColors[color]).map((shade) => (
                    <button
                      // @ts-expect-error shade map exists
                      key={tailwindColors[color][shade]}
                      className="inline-block rounded-lg size-14 focus:outline focus:outline-2 focus:outline-slate-950 focus:outline-offset-1"
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
  );
}

export default ColorPalate;
