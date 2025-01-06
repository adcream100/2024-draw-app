import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductALL } from '../libs/requests';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('isDraw') === null) {
      localStorage.setItem('isDraw', 'false');
    }
  }, []);

  useEffect(() => {
    const checkIsDraw = () => {
      const isDraw = localStorage.getItem('isDraw') === 'true';
      if (isDraw) {
        navigate('/draw');
      }
    };

    checkIsDraw();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'isDraw' && event.newValue === 'true') {
        navigate('/draw');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const { actions } = useProductALL();

  return (
    <div className="h-screen flex ">
      <div className="text-center m-auto w-2/3 h-auto drop-shadow-lg ">
        <h1 className="text-[1.5rem] font-bold mb-6">
          서울영상광고제를 후원해 주신 광고주께 감사드립니다.
        </h1>
        <div className="grid grid-cols-3 gap-6 ">
          {actions.map(
            (
              {
                ImageLink,
                GiftName,
                AdMan,
              }: {
                ImageLink: string;
                GiftName: string;
                AdMan: string;
              },
              index: number,
            ) => (
              <div key={index} className="p-4 flex flex-col items-center justify-between border ">
                <div className="w-full h-[150px] bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
                  <img src={ImageLink} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="w-full text-left flex flex-col gap-2 flex-1">
                  <p className="font-bold text-[24px]">{AdMan}</p>
                  <p className="text-lg text-gray-700">{GiftName}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
