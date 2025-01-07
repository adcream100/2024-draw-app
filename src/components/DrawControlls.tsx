import { useState } from 'react';

interface DrawControlsProps {
  actions: Array<{ code: string; DrawNo: number; Flag: number }>;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const DrawControls = ({ actions, isLoading, setIsLoading }: DrawControlsProps) => {
  const [drawValues, setDrawValues] = useState<{ [key: string]: number }>({});

  const handleDraw = async (code: string, DrawNo: number) => {
    const sort = drawValues[code] || DrawNo;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/awards/festival2024/seat/random?draw_no=${sort}`,
        { method: 'GET', headers: { 'Content-Type': 'application/json' } },
      );
      const data = await response.json();

      const result = data.map((e: { SeatNo: string }) => e.SeatNo.trim()).join(',');

      setTimeout(() => {
        localStorage.setItem(code, result);
      }, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleSelectChange = (code: string, value: number) => {
    setDrawValues(prev => ({ ...prev, [code]: value }));
  };

  const handleSwiper = (index: number) => {
    localStorage.setItem('slice', index.toString());
  };

  return (
    <div className="grid grid-cols-6 gap-4  place-items-center">
      {actions.map(({ code, DrawNo, Flag }, index) => (
        <div key={index}>
          <button className="p-1 text-xs border rounded-lg" onClick={() => handleSwiper(index)}>
            이동
          </button>
          {Flag === 0 ? (
            <div className=" p-4 flex flex-col items-center"></div>
          ) : (
            <div className=" p-4 flex flex-col items-center">
              <button
                className="border rounded-lg p-2 text-sm text-gray-700"
                onClick={() => handleDraw(code, DrawNo)}
                disabled={isLoading || Flag === 0}
              >
                {code}
                <div>추첨하기</div>
              </button>
            </div>
          )}
          <div className="flex flex-col items-center ">
            {Flag === 0 ? (
              <></>
            ) : (
              <>
                <select
                  className="p-1  border-b"
                  value={drawValues[code] || 0}
                  onChange={e => handleSelectChange(code, Number(e.target.value))}
                  disabled={isLoading || Flag === 0}
                >
                  <option value={0} hidden>
                    선택해주세요.
                  </option>
                  {Array.from({ length: DrawNo }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <button
                  className="border w-fit p-1 text-xs rounded-lg mt-12"
                  onClick={() => localStorage.removeItem(code)}
                  disabled={isLoading}
                >
                  RESET
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrawControls;
