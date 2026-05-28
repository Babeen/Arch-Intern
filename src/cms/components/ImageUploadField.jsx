import { useRef, useState } from "react";
import { Upload, X, Image } from "lucide-react";

const ImageUploadField = ({ label, value, onChange, hint }) => {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide block">
          {label}
        </label>
      )}

      {/* Preview */}
      {value && (
        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Drop zone */}
      {!value && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`w-full h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
            dragging
              ? "border-amber-400 bg-amber-50 dark:bg-amber-400/10"
              : "border-gray-300 dark:border-gray-700 hover:border-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
            {dragging ? <Upload className="h-5 w-5 text-amber-500" /> : <Image className="h-5 w-5 text-gray-400" />}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {dragging ? "Drop to upload" : "Click or drag image here"}
          </p>
        </div>
      )}

      {/* URL input fallback */}
      <input
        type="text"
        placeholder="Or paste an image URL…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
      />

      {hint && <p className="text-[11px] text-gray-400">{hint}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
};

export default ImageUploadField;
