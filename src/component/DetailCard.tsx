'use client';
import React from 'react';
import { IoIosClose } from "react-icons/io";
type Props ={
    isConfirm: boolean;
    onOk: (e?: React.MouseEvent<HTMLElement>) => void;
    onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
    children: React.ReactNode;
    width?: string;
}
 const DetailCard = ({ isConfirm, onOk, onCancel, children, width='500px' }:Props) => {

    const onClose = (e?: React.MouseEvent<HTMLElement>) => {
        if (isConfirm) {
            e?.stopPropagation();
            onOk(e);
        } else {
            e?.stopPropagation();
            onCancel(e);
        }
    };
    return (
        <div className={'common-popup__bg'}>
            <div className={'common-popup__wrap'}  >
                <div style={{width:width}} className={'common-popup__box'}>
                <div className={'common-popup__close'}>
                    <IoIosClose size="50" className={'cursor-pointer'}  onClick={onClose}/>
                </div>
                <div className={'common-popup__body'}>{children}</div>
                <div className={'common-popup__btn pb-3'}>
                    {!isConfirm && (
                    <button onClick={onCancel} className={'px-10 py-3 border-1 border-gray-200 mr-2 rounded'}>취소</button>
                    )}
                    <button onClick={onOk} className={'px-10 py-3 border-1 border-gray-200 rounded'}>확인</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default DetailCard;