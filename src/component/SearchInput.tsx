import React from "react";
import {className} from "postcss-selector-parser";

type Props ={
    width?: string,
    fontSize?:string,
    onChange: (value: string) => void;
    classes?: string,
}
export default function SearchInput({width='500px', fontSize='16px',onChange,classes}: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };
    return (
        <div className={`input__wrap ${classes}`}>
            <input className={'input__box'} type="text" onChange={handleChange} style={{width:width, fontSize:fontSize}} />
        </div>
    );
}