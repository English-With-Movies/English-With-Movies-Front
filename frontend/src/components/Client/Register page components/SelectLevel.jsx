import React from 'react';
import { Select } from 'antd';
import { useGetAllLevelQuery } from '../../../redux/rtk query/Slices/levelSlice';
import { useField, useFormikContext } from 'formik';

export default function SelectLevel({ name }) {
    let { data } = useGetAllLevelQuery()
    const { setFieldValue } = useFormikContext();
    const [field] = useField(name);

    const onChange = (value) => {
        setFieldValue(name, value);
    };
    const onSearch = (value) => {
        console.log(value);
    };
    return (
        <Select
            {...field}
            showSearch
            className='placeholder:text-black'
            // placeholder="Select a your level"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={data?.map(level => ({
                value: level.id,
                label: level.name
            })) || []}
        />
    )
}