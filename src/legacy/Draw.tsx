import Loading from '../components/Loading';
import DrawCard from '../components/DrawCard';
import useDrawData from '../hook/useDrawData';
import useCheckHome from '../hook/useCheckHome';

const Draw = () => {
  const { data, isLoading } = useDrawData();
  useCheckHome();

  return (
    <>
      {isLoading && <Loading />}
      <div className="text-center">
        <h1 className="text-[1.5rem] font-bold mb-6">
          서울영상광고제 후원해 주신 분들께 감사드립니다.
        </h1>
        <div className="grid grid-cols-6 gap-4">
          {data.map((item, index) => (
            <DrawCard key={index} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Draw;
