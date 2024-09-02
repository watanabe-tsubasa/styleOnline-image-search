import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, width, height }) => {
  return (
    <div className="rounded-md aspect-square bg-muted flex items-center justify-center overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}

export default LazyImage;