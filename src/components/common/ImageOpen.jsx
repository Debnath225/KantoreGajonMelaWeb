import { X } from "lucide-react";


const ImageOpen = (src) => {
    const handelClose = () => {
        // Logic to close the image viewer

    }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
      <img
        src={src}
        alt="Enlarged"
        className="max-w-full max-h-full rounded-lg"
      />
      <button onClick={() => handelClose()}>
        <X />
      </button>
    </div>
  );
};

export default ImageOpen;
