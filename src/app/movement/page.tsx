'use client';
import React, { useState, useEffect,Suspense  } from 'react';
import { fetchHonorData } from '@/app/api/store/data';
import Pagination from '@/component/Pagenation';
import { useSearchParams } from 'next/navigation';
import {BeatLoader} from "react-spinners"
import DetailCard from "@/component/DetailCard";
import SearchSelect from "@/component/SearchSelect";
import SearchInput from "@/component/SearchInput";

export default function MovementPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MovementPageContent />
        </Suspense>
    );
}

function MovementPageContent() {
    const searchParams = useSearchParams();
    const path = searchParams.get('workoutAffil');
    const [pageTitle, setPageTitle] = useState('')
    const params = new URLSearchParams(searchParams.toString());

    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [selectOption, setSelectOption] = useState('nameKo');
    const [textInput, setTextInput] = useState('')

    useEffect(() => {
        if (path === 'UGC00002'){
            setPageTitle('의병')
        }else if (path === 'UGC00003'){
            setPageTitle('3.1운동')
        }else if (path === 'UGC00004'){
            setPageTitle('문화운동')
        }else if (path === 'UGC00005'){
            setPageTitle('국내항일')
        }else if (path === 'UGC00006'){
            setPageTitle('의열투쟁')
        }else if (path === 'UGC00007'){
            setPageTitle('학생운동')
        }else if (path === 'UGC00008'){
            setPageTitle('광복군')
        }else if (path === 'UGC00009'){
            setPageTitle('계몽운동')

        }else if (path === 'UGC00010'){
            setPageTitle('임시정부')
        }else if (path === 'UGC00011'){
            setPageTitle('일본방면')
        }else if (path === 'UGC00012'){
            setPageTitle('만주방면')
        }else if (path === 'UGC00013'){
            setPageTitle('중국방면')
        }else if (path === 'UGC00014'){
            setPageTitle('노령방면')
        }else if (path === 'UGC00015'){
            setPageTitle('미주방면')
        }else if (path === 'UGC00017'){
            setPageTitle('인도네시아방면')
        }else if (path === 'UGC00023'){
            setPageTitle('독립운동지원')
        }
        const fetchData = async () => {
            setPage(1)
            try {
                const fetchedData = await fetchHonorData(params);
                const sortData = fetchedData.ITEMS.filter((item: any) => item.MNG_NO !== '4987')
                fetchedData.ITEMS = sortData
                setData(fetchedData);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
            }
        };
        fetchData();
        setTextInput('')
    }, [params.toString()]);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);

    }

    const openDetail = (message:string) =>{
        setMessage(message)
        setIsModalOpen(true)
    }
    const updatePageQuery = (currentPage: number) => {
        params.set('nPageIndex', currentPage.toString());
        params.set('nCountPerPage', '20');
        params.set('workoutAffil', path || '');

        return params;
    };

    const setPage = async (currentPage: number) => {
        if (currentPage === undefined) {
            currentPage = 1;
        }
        const pageUpdate = updatePageQuery(currentPage);
        try {
            const fetchedData = await fetchHonorData(pageUpdate);
            setData(fetchedData);
        } catch (error) {
            setIsError(true);
        }
    };

    if (isError) {
        return <div>데이터를 가져오는 중에 오류가 발생했습니다.</div>;
    }
    const options = [
        { value: "nameKo", key: "성명" },
        { value: "hunkuk", key: "훈국" },
        { value: "sex", key: "성별" },
    ];

    const selectValue = (value: string) => {
        setSelectOption(value);
    };

    const inputValue = (value: string) => {
        setTextInput(value);
    };

    const searchPageQuery = () => {
        let code:string = ''
        if (selectOption === 'nameKo'){
            if (textInput === ''){
                openDetail('성명을 입력해주세요.')
            }else {
                code = textInput
            }
        }else  if (selectOption === 'hunkuk') {
            if (textInput === '대한민국장' || textInput === '대한민국' || textInput === '대한'){
                code = 'PSG00002'
            }else if (textInput === '대통령장'){
                code = 'PSG00003'
            }else if (textInput === '독립장' ||textInput === '독립'){
                code = 'PSG00004'
            }else if (textInput === '애국장' || textInput === '애국'){
                code = 'PSG00005'
            }else if (textInput === '애족장' || textInput === '애족'){
                code = 'PSG00006'
            }else if (textInput === '건국포장'|| textInput === '건국'){
                code = 'PSG00007'
            }else if (textInput === '대통령표창'||textInput === '표창'){
                code = 'PSG00008'
            }else {
                openDetail('검색어를 다시 입력해주세요.')
            }

        }else  if (selectOption === 'sex') {
            if (textInput === '여' || textInput === '여자' ){
                code = '0'
            }else if (textInput === '남' || textInput === '남자' ){
                code = '1'
            }else {
                openDetail('성별은 남,여로만 검색이 가능합니다.')
            }
        }
        params.set(selectOption, code);
        return params;
    };
    const handleSearchFilter = async () => {
        setPage(1);
        searchPageQuery();
        const fetchedData = await fetchHonorData(params);
        setData(fetchedData);
    };


    // @ts-ignore
    return (

        <div className={'w-full flex justify-center px-5 py-3'} >
            <div className={'w-1280 flex-col '}>
                <div className={'flex justify-center items-center font-bold text-2xl py-10'}>운동계열: {pageTitle}</div>
                <div className={'flex justify-end mb-2'}>
                    <SearchSelect classes={'mr-2 cursor-pointer'} width={'150px'} options={options}
                                  onChange={(value) => selectValue(value)}/>
                    <SearchInput classes={'mr-2'} width={'300px'} onChange={(value) => inputValue(value)}/>
                    <button className={'search__btn'} onClick={handleSearchFilter}>검색</button>
                </div>
                <div className={'flex flex-wrap'}>
                    {data?.ITEMS?.map((item: any) => (
                        <div
                            className={'border-gray-600 rounded border-solid border-1 px-3 py-2 m-1 cursor-pointer'}
                            style={{width: '19.37%'}}
                            key={item.MNG_NO} onClick={() => {
                            setSelectedItem(item);
                            openDetail(item?.ACHIVEMENT_KO);
                        }}
                        >
                            <div>
                                <div className={'text-sm leading-6'}>
                                    성명: {item.MNG_NO !== '4987' ? item.NAME_KO : '-'}{item.MNG_NO !== '4987' ? `(${item.NAME_CH})` : ''}
                                </div>
                                <p className={'text-sm leading-6'}>성별: {item.MNG_NO !== '4987' ? item.SEX : '-'}</p>
                                <p className={'text-sm leading-6'}>생년월일: {item.MNG_NO !== '4987' ? item.BIRTHDAY : '-'}</p>
                                <p className={'text-sm leading-6'}>사망년월일: {item.MNG_NO !== '4987' ? item.LASTDAY : '-'}</p>
                                <p className={'text-sm leading-6'}>포상년도: {item.MNG_NO !== '4987' ? item.JUDGE_YEAR : '-'}년</p>
                                <p className={'text-sm leading-6'}>본적: {item.MNG_NO !== '4987' ? item.REGISTER_LARGE_DIV : '-'} {item.MNG_NO !== '4987' ? item.REGISTER_MID_DIV : ''}</p>
                                <p className={'text-sm leading-6'}>훈격
                                    기준: {item.MNG_NO !== '4987' ? item.HUNKUK : '-'}</p>
                            </div>

                        </div>

                    ))}
                </div>
                <div className={'flex justify-center align-middle w-full mt-5'}>
                    <Pagination
                        contentSize={20}
                        totalElements={data?.TOTAL_COUNT ? data?.TOTAL_COUNT : 1}
                        setPage={setPage}
                    />
                </div>
                {isModalOpen &&
                    <DetailCard isConfirm={true}
                                onOk={(e?:React.MouseEvent<HTMLElement, MouseEvent>) => {
                                    e?.stopPropagation();
                                    handleOk();
                                }}
                                onCancel={(e?:React.MouseEvent<HTMLElement, MouseEvent>) => {
                                    e?.stopPropagation();
                                    handleCancel();
                                }}>
                        <p className="medium center_align" style={{wordBreak: 'keep-all'}}>{message}</p>
                    </DetailCard>
                }
            </div>
        </div>
    );
}