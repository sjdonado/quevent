import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line import/prefer-default-export
export const useCheckBox = (data, loading, rows, setRows) => {
  const [isEditting, setIsEditting] = useState(false);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isActiveStateChanged, setIsActiveStateChanged] = useState(false);
  const [numberOfCheckedRows, setNumberOfCheckedRows] = useState(0);

  useEffect(() => {
    if (!loading) {
      setRows(data.getUser.events);
    }
  }, [loading, data]);

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


  const handleReset = () => {
    setIsActiveStateChanged(false);
    setIsEditting(false);
    setRows(data.getUser.events);
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
