import { useProductALL } from '../libs/requests';
import useStorageSync from '../hook/useStorageSync';
import DrawControls from '../components/DrawControls';

const Controller = () => {
  const { actions } = useProductALL();
  const [isDraw, setIsDraw] = useStorageSync('isDraw', false, value => value === 'true');
  const [isLoading, setIsLoading] = useStorageSync('isLoading', false, value => value === 'true');

  const handleToggleDraw = () => {
    setIsDraw(!isDraw);
  };

  const handleResetAll = async () => {
    const preservedKey = 'isDraw';
    const preservedValue = localStorage.getItem(preservedKey);
    localStorage.clear();
    if (preservedValue !== null) {
      localStorage.setItem(preservedKey, preservedValue);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-[1.5rem] font-bold mb-6 ">
        서울영상광고제 후원해 주신 분들께 추첨을 시작해주세요.
      </h1>
      {isDraw ? (
        <div className="flex flex-col items-center">
          <button
            className="font-bold rounded-lg p-2 mb-6 inset-lg hover:inset-lg"
            onClick={handleResetAll}
          >
            RESET ALL
          </button>
          <DrawControls actions={actions} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
      ) : (
        <div>
          <button className="border p-2 mb-6" onClick={handleToggleDraw}>
            시작하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Controller;
