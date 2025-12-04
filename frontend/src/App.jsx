import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import ThumbnailGallery from "./components/ThumbnailGallery";
import Viewer from "./components/Viewer";
import { fetchCategories, fetchFiles } from "./api/api";
import { generateVideoThumbnail } from "./utils/generateVideoThumbnail";
import { getFileType } from "./utils/getFileType";
import { Box } from "@mui/material";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState("");
  const [localFiles, setLocalFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories);
    fetchFiles().then(setFilesData);
  }, []);

  const handleFolderSelect = async (folder) => {
    const filesArr = [];

    for await (const entry of folder.values()) {
      if (entry.kind !== "file") continue;

      const file = await entry.getFile();
      const type = getFileType(file);

      let thumbnail = null;
      if (type === "video") thumbnail = await generateVideoThumbnail(file);
      if (type === "image") thumbnail = URL.createObjectURL(file);

      filesArr.push({
        fileName: file.name.split(".")[0],
        url: URL.createObjectURL(file),
        type,
        thumbnail,
      });
    }

    setLocalFiles(filesArr);
  };

  const filteredFiles = () => {
    let f = localFiles;

    if (selectedPerson) {
      const person = filesData.find(p => p.name === selectedPerson);
      if (person) {
        const allowed = person.files.map(x => x.fileName);
        f = f.filter(x => allowed.includes(x.fileName));
      }
    }

    if (selectedCategories.length > 0) {
      f = f.filter(file => {
        const person = filesData.find(p =>
          p.files.some(ff => ff.fileName === file.fileName)
        );
        if (!person) return false;

        const fileMeta = person.files.find(ff => ff.fileName === file.fileName);
        const fileCats = fileMeta.categories.split(",");

        return selectedCategories.every(cat => fileCats.includes(cat));
      });
    }

    return f;
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const getSelectedPersonName = () => {
    if (!selectedFile) return "";
  
    const person = filesData.find(p =>
      p.files.some(f => f.fileName === selectedFile.fileName)
    );
  
    return person ? person.name : "";
  };

  return (
    <>
      <TopBar onFolderSelect={handleFolderSelect} />

      <SideBar
        categories={categories}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        persons={filesData}
        selectedPerson={selectedPerson}
        onSelectPerson={setSelectedPerson}
      />

      <Box sx={{ ml: "250px", mt: 8, p: 2 }}>
        <Viewer file={selectedFile} personName={getSelectedPersonName()} />
        <ThumbnailGallery files={filteredFiles()} onSelect={setSelectedFile} />
      </Box>
    </>
  );
}
