import React, { useRef, useEffect, SetStateAction } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/library';
import { Button } from '@/components/ui/button';

interface BarcodeReaderProps {
  setBarcode: React.Dispatch<React.SetStateAction<string>>;
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>
  isQRMode: boolean;
}

export const BarcodeReader: React.FC<BarcodeReaderProps> = ({
  setBarcode,
  isScanning,
  setIsScanning,
  open,
  setOpen,
  isQRMode
}) => {
  const webcamRef = useRef<Webcam>(null);
  const getJANfromURL = (url: string) => {
    const regex = /\d{13}/;
    const match = url.match(regex);

    if (match) {
        return match[0]
    } else {
        return 'QRに誤りがあるかもしれません。手入力してください。'
    }
  }
  const scanStyle = isQRMode ? 'flex items-center w-full': 'flex items-center w-full h-32 overflow-hidden'
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const decode = async () => {
      if (!webcamRef.current || !isScanning) return;
      const imageSrc = webcamRef.current.getScreenshot();
      // if (!imageSrc) return;
      // try {
      //   const result = await codeReader.decodeFromImage(undefined, imageSrc);
      //   if (!result) return;      
      //   let text = result.getText();
      //   if (isQRMode) text = getJANfromURL(text);
        
      //   setBarcode(text);
      //   setIsScanning(false);  // バーコードを検出したらスキャンを停止
        
      // } catch (error) {
      //   // console.log(error)
      // }
      
      if (imageSrc) {
        try {
          const result = await codeReader.decodeFromImage(undefined, imageSrc);
          if (result) {
            let text = result.getText();
            if (isQRMode) {
              text = getJANfromURL(text);
            }
            setBarcode(text);
            setIsScanning(false);  // バーコードを検出したらスキャンを停止
          }
        } catch (error) {
          // console.log(error)
        }
      }
      if (isScanning) {
        requestAnimationFrame(decode);  // 画面更新のたびにデコードを試みる
      }
    };

    decode();

    // クリーンアップ関数
    // return () => {
    //   setIsScanning(false);
    // };
  // 依存性配列にsetBarcodeとsetIsScanningを追加
  }, [isScanning, setBarcode, setIsScanning, isQRMode]);

  return (
    <div className='flex flex-col space-y-4'>
      <div className={scanStyle}>
        <Webcam
          className='w-auto'
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: 'environment' }}
        />
      </div>
      {/* <Button className="flex-grow" onClick={() => {setOpen(!open)}}>閉じる</Button> */}
    </div>
  );
};
