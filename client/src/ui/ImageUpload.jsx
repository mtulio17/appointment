import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import supabase, { setSupabaseSession } from "../utils/supabase";

// eslint-disable-next-line react/prop-types
const ImageUpload = ({ onUpload }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const imageURL = await handleImageUpload(file); // Subimos el archivo

      if (imageURL) {
        onUpload(imageURL); // Pasamos la URL al formulario
      } else {
        console.error("Error uploading or retrieving image URL");
      }
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded-md ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Suelta los archivos aquí...</p>
      ) : (
        <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una</p>
      )}
    </div>
  );
};

export default ImageUpload;
