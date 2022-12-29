import React, { ChangeEvent } from 'react';
import Style from './InputStyle.module.css';

export interface IProps {
    label : string;
    value : string;
    type? : string;
    placeholder? : string;
    onChange : (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: IProps) => {
    const { label, value, type, placeholder, onChange } = props;
    return (
        <div className={Style.container }>
            <label>{label} : </label>

                <input
                    placeholder={placeholder}
                    type={type} 
                    value={value} 
                    className={Style.input} 
                    onChange={onChange} 
                />

        </div>
    );
};
