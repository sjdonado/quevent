import React from 'react';
import { DateTimePicker } from "@material-ui/pickers";

const DatePicker = ({
    id,
    name,
    form: { setFieldValue },
    field: { value },
    placeholder,
    label,
    helperText,
    className,
    InputProps,
    InputLabelProps,
  }) => {
    //console.log(rest);
    return (
      <DateTimePicker
        name={name}
        variant="inline"
        id={id}
        label={label}
        helperText={helperText}
        className={className}
        InputProps={InputProps}
        InputLabelProps={InputLabelProps}
        placeholder={placeholder}
        onChange={value => {
          console.log("setting value to", value);
          setFieldValue(id, value);
        }}
        value={value}
      />
    );
  };

  export default DatePicker;