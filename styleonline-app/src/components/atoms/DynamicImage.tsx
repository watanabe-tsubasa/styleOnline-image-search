import { useState, useEffect, useCallback } from 'react';
import Image, { ImageLoader, ImageProps } from 'next/image';

interface DynamicImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  janCode: string;
  width: number;
  height: number;
  altText?: string;
}

const myLoader: ImageLoader = ({ src, width, quality }) => {
  if (src.startsWith('/')) {
    return src;
  }
  return `https://img.aeonretail.com/${src}?w=${width}&q=${quality || 75}`;
};

export const DynamicImage: React.FC<DynamicImageProps> = ({ 
  janCode, 
  width, 
  height, 
  altText = "カード画像",
  placeholder = "blur",
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(janCode === '' ? '/startimage.png' : `Contents/ProductImages/0/P-${janCode}01_LL.jpg`)
    setIsPlaceholder(false);
  }, [janCode]);

  const handleError = useCallback((): void => {
    setImgSrc('/noimage.png');
    setIsPlaceholder(true);
  }, []);

  return (
    <Image
      loader={myLoader}
      src={imgSrc}
      alt={altText}
      width={width}
      height={height}
      layout="responsive"
      className="rounded-md"
      placeholder={isPlaceholder ? "empty" : placeholder}
      blurDataURL="/startimage.png"
      onError={handleError}
      {...props}
    />
  );
};