interface DrawCardProps {
  ImageLink: string;
  DrawNo: number;
  GiftName: string;
  AdMan: string;
  parsedData: string[];
}

const DrawCard = ({ ImageLink, DrawNo, GiftName, AdMan, parsedData }: DrawCardProps) => {
  return (
    <div className="border border-gray-300 p-4 flex flex-col items-center">
      <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
        <img src={ImageLink} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="w-full text-left flex flex-col gap-2">
        <p>추첨개수: {DrawNo}</p>
        <p>{AdMan}</p>
        <p className="text-sm text-gray-700">{GiftName}</p>
      </div>
      <div className="mt-12">
        {parsedData.map((e, i) => (
          <p key={i}>{e}</p>
        ))}
      </div>
    </div>
  );
};

export default DrawCard;
