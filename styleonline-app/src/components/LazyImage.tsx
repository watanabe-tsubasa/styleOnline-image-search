import Image from "next/image";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  return (
    <div className="rounded-md aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
      <Image
        src={src}
        alt={alt}
        className="rounded-md"
      />
    </div>
  );
}

export default LazyImage;