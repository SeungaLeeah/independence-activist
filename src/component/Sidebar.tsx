
import Link from "next/link";
import React, {useState,useEffect} from 'react';
import {IoIosCloseCircleOutline} from "react-icons/io";
type Props = {
    isOpen: boolean;
    onClose: () => void;
}

type MenuItem = {
    href: string;
    title: string;
    path: string;
    classification:string
    child?: MenuItem[];
}
export default function Sidebar({isOpen,onClose}:Props) {
    useEffect(()=>{

    },[isOpen])


    const [childOpen, setChildOpen] = useState<Record<string, boolean>>({});

    const toggleChildOpen = (title: string) => {
        setChildOpen((prevState) => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    };

    const menu: MenuItem[] = [
        {
            href: '/',
            title: '소개',
            path:'',
            classification:''
        },
        {
            href: '/honor',
            title: '훈격 기준',
            classification:'hunkuk', path: 'PSG00002',
            child:[
                {href: '/honor', title: '대한민국장', classification:'hunkuk', path: 'PSG00002'},
                {href: '/honor', title: '대통령장',classification:'hunkuk', path: 'PSG00003'},
                {href: '/honor', title: '독립장',classification:'hunkuk', path: 'PSG00004'},
                {href: '/honor', title: '애국장',classification:'hunkuk', path: 'PSG00005'},
                {href: '/honor', title: '애족장',classification:'hunkuk', path: 'PSG00006'},
                {href: '/honor', title: '건국포장',classification:'hunkuk', path: 'PSG00007'},
                {href: '/honor', title: '대통령표창',classification:'hunkuk', path: 'PSG00008'},

            ]

        },
        {
            href: '/movement',
            title: '운동계열',
            classification:'workoutAffil', path: 'UGC00002',
            child:[
                { href: '/movement', title: '의병',classification:'workoutAffil', path: 'UGC00002'},
                { href: '/movement', title: '3.1운동',classification:'workoutAffil', path: 'UGC00003'},
                { href: '/movement', title: '문화운동',classification:'workoutAffil', path: 'UGC00004'},
                { href: '/movement', title: '국내항일',classification:'workoutAffil', path: 'UGC00005'},
                { href: '/movement', title: '의열투쟁',classification:'workoutAffil', path: 'UGC00006'},
                { href: '/movement', title: '학생운동',classification:'workoutAffil', path: 'UGC00007'},
                { href: '/movement', title: '광복군',classification:'workoutAffil', path: 'UGC00008'},
                { href: '/movement', title: '계몽운동',classification:'workoutAffil', path: 'UGC00009'},
                { href: '/movement', title: '임시정부',classification:'workoutAffil', path: 'UGC00010'},
                { href: '/movement', title: '일본방면',classification:'workoutAffil', path: 'UGC00011'},
                { href: '/movement', title: '만주방면',classification:'workoutAffil', path: 'UGC00012'},
                { href: '/movement', title: '중국방면',classification:'workoutAffil', path: 'UGC00013'},
                { href: '/movement', title: '노령방면',classification:'workoutAffil', path: 'UGC00014'},
                { href: '/movement', title: '미주방면',classification:'workoutAffil', path: 'UGC00015'},
                { href: '/movement', title: '인도네시아방면',classification:'workoutAffil', path: 'UGC00017'},
                { href: '/movement', title: '독립운동지원',classification:'workoutAffil', path: 'UGC00023'},
            ]

        },
    ];


    const renderMenuItem = (item: MenuItem, isChild: boolean = false) => (
        <li key={item.title} className={`${isChild ? 'px-6 py-1.5' : 'px-7 py-1.5'} flex-col`}>
            <Link className="flex-col" href={`${item.href !=='/' ? `${item.href}?${item.classification}=${item.path}` : `${item.href}`}`} onClick={() => toggleChildOpen(item.title)}>
                - {item.title}
            </Link>
            {item.child && childOpen[item.title] && (
                <ul className="ml-0.5" onClick={onClose}>
                    {item.child.map((childItem) => renderMenuItem(childItem, true))}
                </ul>
            )}
        </li>
    );

    return (
        <nav className={`${isOpen ? 'show-menu' : 'hide-menu'} flex-col`}>
            <IoIosCloseCircleOutline
                className="absolute top-4 right-4 cursor-pointer w-8 h-8"
                onClick={onClose}
            />
            <ul>
                {menu.map((item) => isOpen && renderMenuItem(item))}
            </ul>
            <style jsx>{`
            nav {
                padding-top: 40px;
                padding-bottom: 20px;
                position: relative;
                background-color: #f5f5f5;
                width: 250px;
                height: 100vh;
                position: fixed;
                top: 0;
                left: 0;
                transition: transform 0.3s ease-in-out;
                transform: translateX(-100%);
            }

            nav.show-menu {
                transform: translateX(0);
                overflow: auto;
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
        `}</style>
        </nav>
    );
}