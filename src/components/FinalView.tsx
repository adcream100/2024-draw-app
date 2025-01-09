interface DrawCardProps {
  ImageLink: string;
  DrawNo: number;
  GiftName: string;
  AdMan: string;
  parsedData: string[];
  code: string;
}

const FinalView = ({ ImageLink, DrawNo, GiftName, AdMan, parsedData }: DrawCardProps) => {
  return (
    <div className="w-[300px] border border-gray-300 p-4 flex flex-col items-center ">
      <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
        <img src={ImageLink} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-full text-left flex flex-col gap-2">
        <p>추첨개수: {DrawNo}</p>
        <p>{AdMan}</p>
        <p className="text-sm text-gray-700">{GiftName}</p>
      </div>
      <div className="mt-12 flex gap-4 flex-wrap items-center">
        {parsedData.map((item, i) => (
          <div key={i} className="rounded-lg bg-[#1a2035] text-[#fff] text-[24px] p-1">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalView;
