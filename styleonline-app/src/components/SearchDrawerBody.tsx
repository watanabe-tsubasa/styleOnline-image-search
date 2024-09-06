"use client"

import { Suspense, lazy, useState } from "react"
import { gsearchAPIResponse } from "@/app/api/gsearch/route"
import { Skeleton } from "@/components/ui/skeleton"
import useSWR from "swr"
import { CommonDialog } from "./atoms/CommonDialog"
const LazyImage = lazy(() => import('@/components/atoms/LazyImage'))

interface SearchDrawerBodyProps {
  query: string;
}

const fetcher = (query: string) =>
  fetch('/api/gsearch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then(res => res.json());

const useGsearch = (query: string) => {
  const { data, error } = useSWR<gsearchAPIResponse>(
    query ? ['/api/gsearch', query]: null,
    ([, query]) => fetcher(query as string),
    { suspense: true }
  );
  return { data, isError: error };
};


export const SearchDrawerBody: React.FC<SearchDrawerBodyProps> = ({ query }) => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const handleClickImage = (src: string) => {
    setIsModalOpen(!isModalOpen);
    setImgSrc(src);
  }

  const { data, isError } = useGsearch(query)
  if (isError) return (
    <div className="flex justify-center items-center">
      <p className="text-red-800">通信エラーが発生しました</p>
    </div>
  )
  if (!data) return

  return(
    <div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {
          data.map((result) => (
            <div key={result.id} onClick={() => {handleClickImage(result.url)}}>
              <Suspense fallback={<Skeleton className="rounded-md aspect-square" />}>
                <LazyImage
                  src={result.url}
                  alt={result.alt}
                  width={300}
                  height={300             
                  }
                />
              </Suspense>
            </div>
          ))
        }
      </div>
      <CommonDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <Suspense fallback={<Skeleton className="rounded-md aspect-square" />}>
          <LazyImage
            src={imgSrc}
            alt='focusedImage'
            width={500}
            height={800}
          />
        </Suspense>
      </CommonDialog>
    </div>
  )
}