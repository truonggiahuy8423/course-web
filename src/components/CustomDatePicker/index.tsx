import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

type CustomDatePickerProps = {
    name: string;
    placeholder: string;
    control: any;
    mode?: 'date' | 'datetime'; // Chọn chế độ "date" hoặc "datetime"
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    name,
    placeholder,
    control,
    mode = 'date' // Mặc định là chọn ngày
}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                console.log("field", field.value),
                <DatePicker
                    showTime={mode === 'datetime'} // Bật chọn giờ khi mode là "datetime"
                    format={mode === 'datetime' ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY"} // Định dạng khác nhau theo mode
                    value={field.value ? dayjs(field.value, mode === 'datetime' ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY") : null} // Chuyển đổi value theo định dạng
                    onChange={(date, dateString) => {
                        field.onChange(dateString); // Cập nhật giá trị theo dạng chuỗi
                    }}
                    placeholder={placeholder}
                    style={{ width: "100%", height: '50px', fontSize: '16px', maxWidth: '320px' }}
                />
            )}
        />
    );
};

export default CustomDatePicker;
