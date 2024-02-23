import { useState } from "react";
import useShowToast from "../useShowToast";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeBytes = 2 * 1024 * 1024;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeBytes) {
        showToast("Error", "File too large", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Please select an image file", "error");
      setSelectedFile(null);
    }
  };
  return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
