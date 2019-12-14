import { useState, useEffect } from 'react';
// eslint-disable-next-line import/prefer-default-export
export const useCheckBox = (rows, setRows) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isActiveStateChanged, setIsActiveStateChanged] = useState(false);
  const [numberOfCheckedRows, setNumberOfCheckedRows] = useState(0);


  useEffect(() => {
    if (rows.length > 0 && numberOfCheckedRows === rows.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [numberOfCheckedRows, rows]);

  const handleCheckAll = (checked) => {
    const allRowsChecked = rows.map((row) => ({ ...row, checked }));
    setRows(allRowsChecked);
    setNumberOfCheckedRows(checked ? rows.length : 0);
  };

  const handleCheck = (checked, rowId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, checked };
      }
      return row;
    });
    setRows(updatedRows);

    setNumberOfCheckedRows(checked ? numberOfCheckedRows + 1 : numberOfCheckedRows - 1);
  };

  const handleActiveCheckboxChange = (active, rowId) => {
    const updatedRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, active };
      }
      return row;
    });
    setIsActiveStateChanged(true);
    setRows(updatedRows);
  };


  const handleReset = (data) => {
    setIsActiveStateChanged(false);
    setIsEditting(false);
    setRows(data);
    setNumberOfCheckedRows(0);
  };

  return ({
    numberOfCheckedRows,
    isEditting,
    isActiveStateChanged,
    isAllChecked,
    handleActiveCheckboxChange,
    handleCheck,
    handleCheckAll,
    handleReset,
    setIsEditting,
  });
};
