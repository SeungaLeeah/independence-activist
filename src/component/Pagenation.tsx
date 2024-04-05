'use client'
import React, {useState, useEffect} from 'react';
import chevronLeftIcon from '../../public/assets/img/ico_chevron_left.svg'
import chevronRightIcon from '../../public/assets/img/ico_chevron_right.svg'
import Image from "next/image";

type Props={
    totalElements:number,
    contentSize:number,
    setPage:any,
    propClass?: string,
    activeColor?: string
}
const Pagination = ({totalElements=0,contentSize=0,setPage,propClass, activeColor ='#99CE1E'}:Props) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [startNum, setStartNum] = useState(1)
    const maxPage = 5
    const [lastNum, setLastNum] = useState(1)
    let [pages, setPages] = useState<number|{ num: number; active: boolean; }[]>(lastNum?new Array(lastNum).fill(1).map((value, idx) => ({
        num: idx + 1, active: currentPage === idx + 1
    })):0)

    useEffect(() => {
        if (totalElements !== null && contentSize !== null) {
            console.log(totalElements, contentSize,'정보')
            console.log(totalElements / contentSize,'나누기')
            setTotalPages(Math.ceil(totalElements / contentSize));
            console.log(totalPages,'totalPages')
            setLastNum(Math.min(startNum + maxPage - 1, totalPages));
        }

        let tempPages = [];
        for (let i = startNum; i <= lastNum; i++) {
            tempPages.push({
                num: i,
                active: i === currentPage,
            });
        }

        setPages(tempPages);
    }, [startNum, lastNum, totalElements, contentSize, totalPages, currentPage]);

    useEffect(() => {
        if (setPage) {
            setPage(currentPage)
        }
    }, [currentPage])

    const clickPrevPage = () => {
        if (currentPage === 1) {
            return;
        }
        if (currentPage === startNum && startNum > 1) {
            setLastNum((prevState) => prevState - maxPage);
            setStartNum(Math.max(lastNum - maxPage * 2 + 1, 1));
        }
        setCurrentPage((prevState) => prevState - 1);
    };
    const clickNextPage = () => {
        if (currentPage === totalPages) {
            return;
        }
        if (currentPage === lastNum && lastNum < totalPages) {
            setStartNum((prevState) => prevState + maxPage);
            setLastNum(Math.min(startNum + maxPage * 2 - 1, totalPages));
        }
        setCurrentPage((prevState) => prevState + 1);
    };

    const clickPage = (pageNum:number) => {
        setCurrentPage(pageNum)
    }

    const renderingNextPage = () => {
        if (totalPages > lastNum && currentPage === lastNum) {
            setStartNum((prevState) => prevState + maxPage)
            if (lastNum + maxPage > totalPages) {
                setLastNum(totalPages)
            } else {
                setLastNum((prevState) => prevState + maxPage)
            }
        }
    }

    const renderingPrevPage = () => {
        if (startNum > 1 && currentPage === startNum) {
            setStartNum((prevState) => prevState - maxPage)
            if (startNum + maxPage > totalPages) {
                if (typeof pages !== 'number') {
                    setLastNum((prevState) => prevState - pages.length)
                }
            } else {
                setLastNum((prevState) => prevState - maxPage)
            }
        }
    }

    return (
        <nav>
            <ul className={`${propClass} pagination`}>
                <li
                    className={`page-icon ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={clickPrevPage}
                >
                    <Image src={chevronLeftIcon} alt="chevron-left-icon" width={24} height={24}/>
                </li>
                {typeof pages !== 'number' ? pages.map((page, idx) => {
                        return (
                            <li
                                key={idx}
                                className='page'
                                style={page.num === currentPage ? {color: activeColor} : {}}
                                onClick={() => {
                                    clickPage(page.num)
                                }}
                            >
                                {page.num}
                            </li>
                        )
                    }) :
                    <li>
                    </li>}
                <li
                    className={`page-icon ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={clickNextPage}
                >
                    <Image src={chevronRightIcon} alt="chevron-right-icon" width={24} height={24}/>
                </li>
            </ul>
            <style jsx>{`
                .pagination {
                    display: flex;
                    width: 100%;
                }

                .page {
                    display: flex;
                    align-items: center;
                    justify-content: center;
            font-size: 14px;
            color: #777777;
            padding: 8px 18px;
            border-right: 1px solid #eeeeee;
            border-top: 1px solid #eeeeee;
            border-bottom: 1px solid #eeeeee;
            width: 44px;
            height: 36px;
            box-sizing: border-box;
            cursor: pointer;
        }

        .page-icon {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            border-right: 1px solid #eeeeee;
            border-top: 1px solid #eeeeee;
            border-bottom: 1px solid #eeeeee;
            cursor: pointer;
        }

        .page-icon:hover {
            background: #F4F4F4;
        }

        .pagination > li:first-child {
            border-left: 1px solid #eeeeee;
        }

        .disabled {
            border: 1px solid #EEEEEE;
            background: #F5F5F5;
            cursor: default;
        }
    `}</style>
        </nav>
    )

}


export default Pagination
