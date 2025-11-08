import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useField, useFormikContext } from 'formik';
import { useGetAllGenreQuery } from '../../../redux/rtk query/Slices/genreSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function GenresEditSelectOption() {
    let { data: allGenres } = useGetAllGenreQuery()
    const [selectedKeys, setSelectedKeys] = React.useState([]);
    const { setFieldValue } = useFormikContext();
    const names = allGenres?.map((genre) => ({
        key: genre.id,
        element: genre.name
    }));

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedKeys(value);
        setFieldValue(name, value);
    };

    return (
        <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id="demo-multiple-checkbox-label">Genres</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedKeys}
                onChange={handleChange}
                input={<OutlinedInput label="Genres" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {names?.map((name) => (
                    <MenuItem key={name.key} value={name.key}>
                        <Checkbox checked={selectedKeys.includes(name.key)} />
                        <ListItemText primary={name.element} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
