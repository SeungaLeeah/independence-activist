import React from "react";

type Props ={
    options: [{ key: string; value: string; }],
    width?: string,
    fontSize?:string,
    onChange: (value: string) => void;
    classes?: string,
}
export default function SearchSelect({options,width='500px', fontSize='16px',classes, onChange }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };
    return (
        <select className={`select__wrap ${classes}`} style={{width:width, fontSize:fontSize}} onChange={handleChange}>
            {options.map((option) => (
                <option
                    key={option.key}
                    value={option.value}
                >
                    {option.key}
                </option>
            ))}
        </select>
    );
}