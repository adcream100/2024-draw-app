import Lottie from 'lottie-react';
import loadingLottie from '../../public/spinner.json';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white  p-6 rounded-lg shadow-lg">
        <Lottie style={{ width: 300, height: 200 }} animationData={loadingLottie} />
        <p className="text-center text-gray-700 mt-4">추첨중입니다...</p>
      </div>
    </div>
  );
};

export default Loading;
