import { useEffect, useState } from "react";
import "./App.css";
import SelectedBox from "./components/SelectedBox";
import { DATA, grouping, unGrouping } from "./helper/indes";

function App() {
  const [checked, setChecked] = useState({});
  const [leftData, setLeftData] = useState(grouping(DATA));
  const [rightData, setRightData] = useState([]);

  const addHandler = () => {
    setLeftData((leftPrev) => {
      const notGroupedData = unGrouping(leftPrev);
      const newRightData = notGroupedData.filter(
        (item) => item.uniqueId in checked
      );
      const newLeftData = notGroupedData.filter(
        (item) => !(item.uniqueId in checked)
      );
      setRightData((rightPrev) => {
        return grouping([...newRightData, ...unGrouping(rightPrev)]);
      });
      return grouping(newLeftData);
    });
    setChecked({});
  };

  const deleteHandler = () => {
    setRightData((rightPrev) => {
      const notGroupedData = unGrouping(rightPrev);
      const newLeftData = notGroupedData.filter(
        (item) => item.uniqueId in checked
      );
      const newRightData = notGroupedData.filter(
        (item) => !(item.uniqueId in checked)
      );
      setLeftData((leftPrev) => {
        return grouping([...newLeftData, ...unGrouping(leftPrev)]);
      });
      return grouping(newRightData);
    });
    setChecked({});
  };

  return (
    <div className="bg-gray-600 min-h-screen w-full py-8 px-8 flex">
      {/* left */}
      <div className="w-1/2 bg-white rounded-xl py-6 px-3 mr-3">
        <p className="text-center font-bold border-b pb-2 text-lg">All Data</p>
        <button
          className="w-full bg-gray-500 mt-2 py-2 text-white rounded-md"
          onClick={addHandler}
        >
          Add
        </button>
        <div>
          {leftData.map((item) => {
            return (
              <SelectedBox
                key={item[0].uniqueId}
                item={item}
                checked={checked}
                setChecked={setChecked}
              />
            );
          })}
        </div>
      </div>

      {/* right */}
      <div className="w-1/2 bg-white rounded-xl py-6 px-3 ml-3">
        <p className="text-center font-bold border-b pb-2 text-lg">
          Selected Data
        </p>
        <button
          className="w-full bg-gray-500 mt-2 py-2 text-white rounded-md"
          onClick={deleteHandler}
        >
          Delete
        </button>
        <div>
          {rightData.map((item) => {
            return (
              <SelectedBox
                key={item[0].uniqueId}
                item={item}
                checked={checked}
                setChecked={setChecked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
