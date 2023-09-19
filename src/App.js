import './App.css';
import AuthContextProvider from './Components/AuthContext';
import Header from './Components/Header';
import Dropzone from "./Components/Dropzone"
import { useCallback, useState } from 'react';
import cuid from "cuid";
import ImageList from './Components/ImageList';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";

function App() {
  const [images, setImages] = useState([])
  const onDrop = useCallback(acceptedFiles => {
    // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
        setImages(prevState => [
          ...prevState,
          { id: cuid(), src: e.target.result }
        ]);
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
    console.log(acceptedFiles);
  }, []);

  // simple way to check whether the device support touch (it doesn't check all fallback, it supports only modern browsers)
  const isTouchDevice = () => {
    if ("ontouchstart" in window) {
      return true;
    }
    return false;
  };
  console.log(images)

  // Assigning backend based on touch support on the device
  const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <AuthContextProvider>
      <Header />
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <DndProvider backend={backendForDND}>
        <ImageList images={images} setImages={setImages} />
      </DndProvider>
    </AuthContextProvider>
  );
}

export default App;
