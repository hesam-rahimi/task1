import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const SelectedBox = ({ items, checked, setChecked }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);

  const onChange = (e) => {
    const valueKey = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setChecked((prev) => ({ ...prev, [valueKey]: true }));
      const mainItem = items.find((item) => item.uniqueId === +valueKey);
      mainItem.isSelect = true;
    } else
      setChecked((prev) => {
        const newData = { ...prev };
        delete newData[valueKey];
        return newData;
      });
  };

  const onChangeAll = (e) => {
    const checked = e.target.checked;

    if (checked) {
      const ids = items.reduce((prev, current) => {
        prev = { ...prev, [current.uniqueId]: true };
        return prev;
      }, {});
      setChecked((prev) => ({ ...prev, ...ids }));
    } else {
      setChecked((prev) => {
        const newData = { ...prev };
        items.forEach(({ uniqueId }) => delete newData[uniqueId]);
        return newData;
      });
    }
  };

  return (
    <div>
      <div className="bg-gray-200 my-2 py-3 px-2 flex justify-between items-center rounded-md">
        <span className="text-white bg-sky-800 w-9 h-9 rounded-md flex justify-center items-center">{items[0].id}</span>
        <div>quantity :{items.length}</div>
        <div className="flex gap-2">
          <input type="checkbox" className="cursor-pointer" onChange={onChangeAll} checked={items.every(({ uniqueId }) => uniqueId in checked)} />
          <IoIosArrowDown
            fontSize={20}
            cursor="pointer"
            onClick={() => setIsShowDetail((prev) => !prev)}
            className={isShowDetail ? "rotate-180 transition-transform duration-300" : "rotate-0 transition-transform duration-300"}
          />
        </div>
      </div>
      {isShowDetail &&
        items.map((item) => (
          <div key={item.uniqueId} className="flex justify-between items-center bg-slate-300 my-2 py-1 rounded-lg px-3">
            <span>#{item.uniqueId}</span>
            <span>{item.created.slice(0, 10)}</span>
            <input type="checkbox" className="cursor-pointer" checked={item.uniqueId in checked} value={item.uniqueId} onChange={onChange} />
          </div>
        ))}
    </div>
  );
};

export default SelectedBox;
