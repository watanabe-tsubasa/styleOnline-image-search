"use client"

import { Suspense, lazy } from "react"
import { gsearchAPIResponse } from "@/app/api/gsearch/route"
import { Skeleton } from "@/components/ui/skeleton"
import useSWR from "swr"
const LazyImage = lazy(() => import('@/components/atoms/LazyImage'))

interface SearchDrawerBodyProps {
  query: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());
const useGsearch = (query: string) => {
  console.log(query)
  const { data, error } = useSWR<gsearchAPIResponse>(query ? `/api/gsearch?query=${query}` : null, fetcher, { suspense: true });
  return { data, isError: error }
}

export const SearchDrawerBody: React.FC<SearchDrawerBodyProps> = ({ query }) => {

  const { data, isError } = useGsearch(query)
  if (isError) return (
    <div className="flex justify-center items-center">
      <p className="text-red-800">通信エラーが発生しました</p>
    </div>
  )
  if (!data) return

  return(
    <div className="grid grid-cols-2 gap-4 p-4">
      {
        data.map((result) => (
          <div key={result.id}>
            <Suspense fallback={<Skeleton className="rounded-md aspect-square" />}>
              <LazyImage
                src={result.url}
                alt={result.alt}
              />
            </Suspense>
          </div>
        ))
      }
    </div>
  )
}