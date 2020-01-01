import { useState, useEffect } from 'react';
// eslint-disable-next-line import/prefer-default-export
export const useCheckBox = (rows, setRows) => {
    const [isEditting, setIsEditting] = useState(false);
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isActiveStateChanged, setIsActiveStateChanged] = useState(false);
    const [numberOfCheckedRows, setNumberOfCheckedRows] = useState(0);
    const [isSelectingAttendees, setIsSelectingAttendees] = useState(false);
    const [numberOfSelectedRows, setNumberOfSelectedRows] = useState(0);
    const [isAllSelected, setIsAllSelected] = useState(false);
    //const [isSelectableStateChanged, setIsSelectableStateChanged] = useState(false);
    let activeRows = rows.length ? rows.reduce((acum, row) => (row.active ? acum + 1 : acum), 0) : 0;
    useEffect(() => {
        if (rows.length > 0 && numberOfCheckedRows === rows.length) {
            setIsAllChecked(true);
        } else {
            setIsAllChecked(false);
        }

        if (activeRows > 0 && activeRows === numberOfSelectedRows) {
            setIsAllSelected(true);
        } else {
            setIsAllSelected(false);
        }

    }, [numberOfCheckedRows, numberOfSelectedRows, activeRows, rows]);



    const handleCheckAll = (checked) => {
        const allRowsChecked = rows.map((row) => ({...row, checked }));
        setRows(allRowsChecked);
        setNumberOfCheckedRows(checked ? rows.length : 0);
    };

    const handleCheck = (checked, rowId) => {
        const updatedRows = rows.map((row) => {
            if (row._id === rowId) {
                return {...row, checked };
            }
            return row;
        });
        setRows(updatedRows);

        setNumberOfCheckedRows(checked ? numberOfCheckedRows + 1 : numberOfCheckedRows - 1);
    };

    const handleActiveCheckboxChange = (active, rowId) => {
        const updatedRows = rows.map((row) => {
            if (row._id === rowId) {
                if (!active) {
                    const selectable = false;
                    activeRows--;
                    return {...row, active, selectable };
                }
                activeRows++;
                return {...row, active };
            }
            return row;
        });
        setIsActiveStateChanged(true);
        setRows(updatedRows);
    };

    const handleSelectableCheckboxChange = (selectable, rowId) => {
        const updatedRows = rows.map((row) => {
            if (row._id === rowId) {
                return {...row, selectable };
            }
            return row;
        });
        setNumberOfSelectedRows(selectable ? numberOfSelectedRows + 1 : numberOfSelectedRows - 1);
        setRows(updatedRows);
    };

    const handleSelectAll = (selectable) => {
        let count = 0;
        const allRowsSelected = rows.map((row) => {
            if (row.active) {
                count++;
                return {...row, selectable };
            }
            return row;
        });
        setRows(allRowsSelected);
        setNumberOfSelectedRows(selectable ? count : 0);
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
        isSelectingAttendees,
        handleActiveCheckboxChange,
        handleCheck,
        handleCheckAll,
        handleReset,
        setIsEditting,
        setIsSelectingAttendees,
        //isSelectableStateChanged,
        handleSelectableCheckboxChange,
        numberOfSelectedRows,
        handleSelectAll,
        isAllSelected
    });
};