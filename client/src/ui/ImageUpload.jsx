import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import supabaseClient from "../utils/supabase";

// eslint-disable-next-line react/prop-types
const ImageUpload = ({ onUpload, token }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const supabase = await supabaseClient(token);

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileName = `${Date.now()}_${file.name}`;

      const { data, error } = await supabase.storage
        .from("event-images")
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading file:", error);
        return;
      }

      const imageUrl = `${supabase.storage.from("event-images").getPublicUrl(fileName).publicURL}`;
      onUpload(imageUrl);
    }
  }, [onUpload, token]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded-md ${
        isDragActive ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop the files here ...</p>
      ) : (
        <p>Drag  drop an image here, or click to select one</p>
      )}
    </div>
  );
};

export default ImageUpload;
