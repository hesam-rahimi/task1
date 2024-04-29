import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const TodoBox = ({ id,checked,setChecked, sortedDatas,checkAll }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);

  const selectHandler = (uniqueId) => {
    const mainData = sortedDatas[id].find((data) => data.uniqueId === uniqueId);
    mainData.isSelect = !mainData.isSelect;
  };


  


  return (
    <>
      <div className="bg-gray-200 my-2 py-3 px-2 flex justify-between items-center rounded-md">
        <span className="text-white bg-sky-800 w-9 h-9 rounded-md flex justify-center items-center">
          {id}
        </span>
        <div>
          quantity :{" "}
          {sortedDatas[id].filter((data) => data.isSelect === false).length}
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            value={id}
            className="cursor-pointer"
            onChange={() => checkAll(id)}
          />
          <IoIosArrowDown
            fontSize={20}
            cursor="pointer"
            onClick={() => setIsShowDetail((prev) => !prev)}
            className={
              isShowDetail
                ? "rotate-180 transition-transform duration-300"
                : "rotate-0 transition-transform duration-300"
            }
          />
        </div>
      </div>
      {isShowDetail &&
        sortedDatas[id].map(
          (todo) =>
            todo.isSelect === false && (
              <div
                key={todo.uniqueId}
                className="flex justify-between items-center bg-slate-300 my-2 py-1 rounded-lg px-3"
              >
                <span>#{todo.uniqueId}</span>
                <span>{todo.created.slice(0, 10)}</span>
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  value={todo.uniqueId}
                  onChange={() => selectHandler(todo.uniqueId)}
                />
              </div>
            )
        )}
    </>
  );
};

export default TodoBox;
