import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import ImagesModal from './components/Modals/ImagesModal.tsx'
import CropImageModal from './components/Modals/CropImageModal.tsx' 
import './index.css' 
import ConfirmModal from './components/Modals/ConfirmModal.tsx' 
import { Toaster } from 'react-hot-toast'
import MusicModal from './components/Modals/MusicModal.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App /> 
      <ImagesModal />
      <CropImageModal /> 
      <ConfirmModal /> 
      <MusicModal /> 
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
