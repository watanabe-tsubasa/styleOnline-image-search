import { shelfAPIResponseType } from "@/app/api/shelf/route";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import { useDebounce } from 'use-debounce';

const fetcher = (janCode: string) => 
  fetch('api/shelf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ janCode })
  }).then(res => res.json());
  

const useShelf = (janCode: string) => {
  const { data, error } = useSWR<shelfAPIResponseType>(
    janCode ? ['api/shelf', janCode]: null,
    ([, janCode]) => fetcher(janCode as string),
    { suspense: true }
  );
  return { data, isError: error };
}

interface ShelfPlacementProps {
  janCode: string;
}

const ShelfString: React.FC<ShelfPlacementProps> = ({ janCode }) => {
  const [debouncedJanCode] = useDebounce(janCode, 100)
  const { data } = useShelf(debouncedJanCode)
  if (janCode === '') return <p>商品陳列場所を表示します</p>
  if (!data) return
  return (
    <div>
      {
        (!data || data.length === 0) ? 
        <p className="text-gray-400">棚情報が登録されていません</p> :
        <p>商品陳列場所：{`${data[0].shelf}-${data[0].column}-${data[0].row}`}</p>
      }
    </div>
  )
}

const FallbackLoader = () => {
  return(
    <div className="flex">
      <Loader2 className="animate-spin opacity-50" />
      <p className="opacity-50">棚位置検索中...</p> 
    </div>
  )
}
const ErrorMessage = () => {
  return(
    <div>
      <p className="text-red-800">通信エラーが発生しました</p>
    </div>
  )
}

export const ShelfPlacement: React.FC<ShelfPlacementProps> = ({ janCode }) => {
  return (
      <div className="flex flex-grow justify-center">
        <ErrorBoundary
         fallback={<ErrorMessage />}
         resetKeys={[janCode]}
        >
          <Suspense fallback={<FallbackLoader />}>
            <ShelfString janCode={janCode} />
          </Suspense>
        </ErrorBoundary>
      </div>
  )
}