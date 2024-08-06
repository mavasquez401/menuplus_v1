import React, { useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';
import Tesseract from 'tesseract.js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera as CameraIcon } from 'lucide-react'; // Import the camera icon

interface MenuScannerProps {
  onMenuScanned: (menu: string) => void;
  onSectionExtracted: (section: string) => void;
}

const MenuScanner: React.FC<MenuScannerProps> = ({
  onMenuScanned,
  onSectionExtracted,
}) => {
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const camera = useRef<any>(null);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const captureImage = () => {
    if (camera.current) {
      const imageSrc = camera.current.takePhoto();
      setCapturedImage(imageSrc);
      setIsCameraOn(false);
      extractTextFromImage(imageSrc);
    }
  };

  const extractTextFromImage = async (imageSrc: string) => {
    try {
      const result = await Tesseract.recognize(imageSrc, 'eng');
      setExtractedText(result.data.text);
      onMenuScanned(result.data.text);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };

  const extractSection = () => {
    onSectionExtracted(section);
    setSection('');
  };

  return (
    <div className="space-y-4">
      {isCameraOn && (
        <div className="space-y-2">
          <Camera ref={camera} errorMessages={{}} />
          <Button onClick={captureImage} className="w-full">
            Capture Menu
          </Button>
        </div>
      )}

      {capturedImage && (
        <div>
          <h3 className="text-lg font-semibold">Captured Menu:</h3>
          <img src={capturedImage} alt="Captured menu" className="max-w-full" />
        </div>
      )}

      {extractedText && (
        <div>
          <h3 className="text-lg font-semibold">Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <Input
          type="text"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          placeholder="Enter menu section (e.g., 'Appetizers', 'Main Course')"
          className="flex-grow"
        />
        <Button onClick={extractSection}>Extract Section</Button>
        <Button onClick={toggleCamera} variant="outline" size="icon">
          <CameraIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MenuScanner;
