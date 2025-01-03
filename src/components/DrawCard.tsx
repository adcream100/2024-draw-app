interface DrawCardProps {
  ImageLink: string;
  DrawNo: number;
  GiftName: string;
  AdMan: string;
  parsedData: string[];
}

const DrawCard = ({ ImageLink, DrawNo, GiftName, AdMan, parsedData }: DrawCardProps) => {
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
          {parsedData.map((e, i) => (
            <div key={i} className="rounded-lg bg-[#1a2035] text-[#fff] text-[24px] p-2">
              {e}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawCard;
