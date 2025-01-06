import { useState, useEffect } from 'react';

interface DrawCardProps {
  ImageLink: string;
  DrawNo: number;
  GiftName: string;
  AdMan: string;
  parsedData: string[];
  code?: string | any;
}

const DrawCard = ({ ImageLink, DrawNo, GiftName, AdMan, parsedData, code }: DrawCardProps) => {
  const [, setCurrentIndex] = useState(-1);
  const [currentData, setCurrentData] = useState<{ code: string }[]>([]);

  const checkAndStartLogic = () => {
    const storedCode = localStorage.getItem(code);
    if (!storedCode) {
      return;
    }

    if (parsedData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;

        if (nextIndex < parsedData.length) {
          setCurrentData(prevData => [...prevData, { code: parsedData[nextIndex] }]);
          return nextIndex;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 300);

    return () => clearInterval(interval);
  };

  // 로컬 스토리지 키 변경 시 로직 재실행
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === code) {
        setCurrentData([]);
        setCurrentIndex(-1);
        checkAndStartLogic();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [code]);

  useEffect(() => {
    checkAndStartLogic();
  }, [parsedData, code]);

  return (
    <div className="flex gap-8 items-center justify-center h-full">
      <div className="flex-1 w-[500px] h-[500px] border overflow-hidden rounded-lg bg-gray-200">
        <img src={ImageLink} alt="product img" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex-col">
        <div className="w-full text-left flex flex-col gap-2 text-[#fff]">
          <p className="text-lg">추첨개수: {DrawNo}</p>
          <p className="font-bold text-[32px]">{AdMan}</p>
          <p className="text-xl">{GiftName}</p>
        </div>
        <div className="mt-12 flex gap-4 flex-wrap items-center">
          {currentData.map((item, i) => (
            <div key={i} className="rounded-lg bg-[#1a2035] text-[#fff] text-[24px] p-2">
              {item.code}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawCard;
