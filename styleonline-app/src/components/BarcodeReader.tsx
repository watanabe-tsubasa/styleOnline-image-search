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
}

export const BarcodeReader: React.FC<BarcodeReaderProps> = ({
  setBarcode,
  isScanning,
  setIsScanning,
  open,
  setOpen
}) => {
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const decode = async () => {
      if (!webcamRef.current || !isScanning) return;

      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        try {
          const result = await codeReader.decodeFromImage(undefined, imageSrc);
          if (result) {
            setBarcode(result.getText());
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
  }, [isScanning, setBarcode, setIsScanning]);

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex items-center w-full h-32 overflow-hidden '>
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