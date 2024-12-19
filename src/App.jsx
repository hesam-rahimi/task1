import { useState } from "react";
import "./App.css";
import { DATA, grouping, unGrouping } from "./helper/indes";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
function App() {
  const [checked, setChecked] = useState({});
  const [data, setData] = useState([grouping(DATA), []]);

  const addHandler = () => {
    setData((prev) => {
      const notGroupedRightData = unGrouping(prev[1]);
      const notGroupedLeftData = unGrouping(prev[0]);
      const newRightData = notGroupedLeftData.filter((item) => item.uniqueId in checked);
      const newLeftData = notGroupedLeftData.filter((item) => !(item.uniqueId in checked));
      return [grouping(newLeftData), grouping([...newRightData, ...notGroupedRightData])];
    });
    setChecked({});
  };

  const deleteHandler = () => {
    setData((prev) => {
      const notGroupedRightData = unGrouping(prev[1]);
      const notGroupedLeftData = unGrouping(prev[0]);
      const newRightData = notGroupedRightData.filter((item) => !(item.uniqueId in checked));
      const newLeftData = notGroupedRightData.filter((item) => item.uniqueId in checked);
      return [grouping([...newLeftData, ...notGroupedLeftData]), grouping(newRightData)];
    });
    setChecked({});
  };

  return (
    <div className="bg-gray-600 min-h-screen w-full py-8 px-8 flex">
      {/* left */}
      <div className="w-1/2 bg-white rounded-xl py-6 px-3 mr-3">
        <p className="text-center font-bold border-b pb-2 text-lg">All Data</p>
        <button className="w-full bg-gray-500 mt-2 py-2 text-white rounded-md" onClick={addHandler}>
          Add
        </button>
        <div>
          {data[0].map((items) => {
            return <LeftSide key={items.map((i) => i.uniqueId)} items={items} setData={setData} checked={checked} setChecked={setChecked} />;
          })}
        </div>
      </div>

      {/* right */}
      <div className="w-1/2 bg-white rounded-xl py-6 px-3 ml-3">
        <p className="text-center font-bold border-b pb-2 text-lg">Selected Data</p>
        <button className="w-full bg-gray-500 mt-2 py-2 text-white rounded-md" onClick={deleteHandler}>
          Delete
        </button>
        <div>
          {data[1].map((items) => {
            return <RightSide key={items.map((i) => i.uniqueId)} items={items} checked={checked} setChecked={setChecked} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
