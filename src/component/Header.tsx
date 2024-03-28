'use client'
import Hamburger from '@/component/ui/icon/Hamburger'
import React, { useState } from 'react';
import Sidebar from "@/component/Sidebar";


export default function Header() {
    const [isSideOpen, setMenu] = useState(false);
    const handleSidebarClose = () => {
        setMenu(false);
    };
    const toggleMenu = () => {
        setMenu((prevState) => !prevState);
    };

    return (
        <header className={'flex justify-center h-25 px-5 py-3 border-1  border-gray-100'}>
            <div className={'flex justify-between items-center  w-1280'}>
            <div onClick={toggleMenu} className={'flex cursor-pointer'}><Hamburger/></div>
            <Sidebar isOpen={isSideOpen} onClose={handleSidebarClose} />
            <h1 className={'font-black text-lg'}>
                독립운동가 인물사전
            </h1>
            <div>
                <img style={{width: '70px', height: '50px' }} className={'border-1 border-gray-200'} src='/assets/img/Flag-SouthKorea.svg' alt="South Korea Flag" />
            </div>
            </div>
        </header>
    );
}