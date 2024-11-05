import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from "antd";
import dayjs from 'dayjs';

type DatePickerProps = {
    name: string;
    placeholder: string;
    control: any;
}

export const CustomDatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
    const { name, placeholder, control } = props;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <DatePicker
                format="DD-MM-YYYY" // Date format
                  value={field.value ? dayjs(field.value, "DD-MM-YYYY") : null} // Convert string to Dayjs object for DatePicker
                  onChange={(date, dateString) => {
                    field.onChange(dateString); // Set field value as string
                  }}
                  placeholder={placeholder}
                  style={{ width: "100%", height: '50px', fontSize: '16px', maxWidth: '320px' }}
                />
            )}
        />
    );
};

export default CustomDatePicker;
