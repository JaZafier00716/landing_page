import { X } from "lucide-react";

type Clip = {
    setClipboard: (id: boolean) => void
}

const clipboard = ({setClipboard} : Clip) => {
  return (
    <div className="z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-30 flex items-center justify-center" onClick={() => setClipboard(false)}>
      <div className="flex gap-2 bg-gray-900 rounded-xl border-2 border-emerald-600 flex-col items-center justify-center">
        <div className="flex justify-end items-start w-full cursor-pointer pt-2 pr-2 text-emerald-600 hover:text-red-600 transition-colors duration-300">
          <X/>
        </div>
        <h1 className="z-50 text-white text-2xl px-4 pb-4">Zkopírováno</h1>
      </div>
    </div>
  );
};

export default clipboard;
