import { useEffect, useState } from "react";
import "./App.css";
import TodoBox from "./components/TodoBox/TodoBox";
import SelectedBox from "./components/SelectedBox/SelectedBox";

const datas = [
  {
    id: "A",
    title: "item 1",
    created: "2022-12-03T07:22:25.911Z",
    uniqueId: 1,
  },
  {
    id: "A",
    title: "item 2",
    created: "2022-08-15T07:22:25.911Z",
    uniqueId: 2,
  },
  {
    id: "A",
    title: "item 3",
    created: "2021-07-28T07:22:25.911Z",
    uniqueId: 3,
  },
  {
    id: "A",
    title: "item 4",
    created: "2022-05-15T07:22:25.911Z",
    uniqueId: 4,
  },
  {
    id: "A",
    title: "item 5",
    created: "2021-11-07T07:22:25.911Z",
    uniqueId: 5,
  },
  {
    id: "B",
    title: "item 6",
    created: "2022-04-10T07:22:25.911Z",
    uniqueId: 6,
  },
  {
    id: "B",
    title: "item 7",
    created: "2022-12-03T07:22:25.911Z",
    uniqueId: 7,
  },
  {
    id: "B",
    title: "item 8",
    created: "2022-08-15T07:22:25.911Z",
    uniqueId: 8,
  },
  {
    id: "C",
    title: "item 9",
    created: "2021-07-28T07:22:25.911Z",
    uniqueId: 9,
  },
  {
    id: "C",
    title: "item 10",
    created: "2022-05-15T07:22:25.911Z",
    uniqueId: 10,
  },
  {
    id: "C",
    title: "item 11",
    created: "2021-11-07T07:22:25.911Z",
    uniqueId: 11,
  },
  {
    id: "C",
    title: "item 12",
    created: "2022-04-10T07:22:25.911Z",
    uniqueId: 12,
  },
  {
    id: "C",
    title: "item 13",
    created: "2022-12-03T07:22:25.911Z",
    uniqueId: 13,
  },
  {
    id: "D",
    title: "item 14",
    created: "2022-08-15T07:22:25.911Z",
    uniqueId: 14,
  },
  {
    id: "D",
    title: "item 15",
    created: "2021-07-28T07:22:25.911Z",
    uniqueId: 15,
  },
  {
    id: "D",
    title: "item 16",
    created: "2022-05-15T07:22:25.911Z",
    uniqueId: 16,
  },
  {
    id: "D",
    title: "item 17",
    created: "2021-11-07T07:22:25.911Z",
    uniqueId: 17,
  },
  {
    id: "E",
    title: "item 18",
    created: "2022-04-10T07:22:25.911Z",
    uniqueId: 18,
  },
  {
    id: "E",
    title: "item 19",
    created: "2021-11-07T07:22:25.911Z",
    uniqueId: 19,
  },
  {
    id: "E",
    title: "item 20",
    created: "2022-04-10T07:22:25.911Z",
    uniqueId: 20,
  },
];

function App() {
  const [rightData, setRightData] = useState([]);
  const [leftData, setLeftData] = useState([]);

  const [checked, setChecked] = useState({});

  const [sortedDatas, setSortedDatas] = useState({});

  useEffect(() => {
    const sortedTodos = datas.reduce((prev, crr) => {
      !prev[crr.id]
        ? (prev[crr.id] = [{ ...crr }])
        : prev[crr.id].push({ ...crr });
      return prev;
    }, {});

    setSortedDatas(sortedTodos);
  }, []);

  const checkAll = (id) => {
    const updatedData = { ...sortedDatas };
    updatedData[id] = updatedData[id].map((item) => ({
      ...item,
      isSelect: true,
    }));
    setSortedDatas(updatedData);
  };

  const changeData = () => {
    setSortedDatas((prev) => ({ ...prev }));
  };

  return (
    <div className="bg-gray-600 min-h-screen w-full py-8 px-8 flex">
      <div className="w-1/2 bg-white rounded-xl py-6 px-3 mr-3">
        <p className="text-center font-bold border-b pb-2 text-lg">All Data</p>
        <button
          className="w-full bg-gray-500 mt-2 py-2 text-white rounded-md"
          onClick={changeData}
        >
          Add
        </button>
        <div>
          {Object.keys(sortedDatas).map(
            (id) =>
              sortedDatas[id].filter((data) => data.isSelect === false).length >
                0 && (
                <TodoBox
                  key={id}
                  id={id}
                  setChecked={setChecked}
                  checked={checked}



                />
              )
          )}
        </div>
      </div>

      {/* right */}

      <div className="w-1/2 bg-white rounded-xl py-6 px-3 ml-3">
        <p className="text-center font-bold border-b pb-2 text-lg">
          Selected Data
        </p>
        <button
          className="w-full bg-gray-500 mt-2 py-2 text-white rounded-md"
          onClick={changeData}
        >
          Delete
        </button>
        <div>
          {Object.keys(sortedDatas).map(
            (id) =>
              sortedDatas[id].filter((data) => data.isSelect === true).length >
                0 && (
                <SelectedBox
                  key={id}
                  id={id}
                  setChecked={setChecked}
                  checked={checked}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
