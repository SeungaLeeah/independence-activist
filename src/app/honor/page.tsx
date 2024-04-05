'use client';
import React, {useState, useEffect, Suspense} from 'react';
import { fetchHonorData } from '@/app/api/store/data';
import Pagination from '@/component/Pagenation';
import { useSearchParams } from 'next/navigation';
import {BeatLoader} from "react-spinners"
import DetailCard from "@/component/DetailCard";
import SearchInput from "@/component/SearchInput";
import SearchSelect from "@/component/SearchSelect";

export default function HonorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HonorPageContent />
        </Suspense>
    );
}

function HonorPageContent() {
    const searchParams = useSearchParams();
    const path = searchParams.get('hunkuk');
    const params = new URLSearchParams(searchParams.toString());
    const [pageTitle, setPageTitle] = useState('')
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [selectOption, setSelectOption] = useState('nameKo');
    const [textInput, setTextInput] = useState('')
    let fetchedData =[]
    useEffect(() => {
        if (path === 'PSG00002'){
            setPageTitle('대한민국장')
        }else if (path === 'PSG00003'){
            setPageTitle('대통령장')
        }else if (path === 'PSG00004'){
            setPageTitle('독립장')
        }else if (path === 'PSG00005'){
            setPageTitle('애국장')
        }else if (path === 'PSG00006'){
            setPageTitle('애족장')
        }else if (path === 'PSG00007'){
            setPageTitle('건국포장')
        }else if (path === 'PSG00008'){
            setPageTitle('대통령표창')
        }
        const fetchData = async () => {
            setPage(1)
            try {
                fetchedData = await fetchHonorData(params);
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
        params.set('hunkuk', path || '');

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

    if (isLoading) {
        return  <BeatLoader className={'w-screen min-h-screen flex justify-center items-center'} style={{display: "flex !important"}} color="#333" />
    }

    if (isError) {
        return <div>데이터를 가져오는 중에 오류가 발생했습니다.</div>;
    }

    const options = [
        { value: "nameKo", key: "성명" },
        { value: "workoutAffil", key: "운동계열" },
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
        }else  if (selectOption === 'workoutAffil') {
            if (textInput === '의병' ){
                code = 'UGC00002'
            }else if (textInput === '3.1운동' || textInput === '3.1' ){
                code = 'UGC00003'
            }else if (textInput === '문화운동' ||textInput === '문화' ){
                code = 'UGC00004'
            }else if (textInput === '국내항일' || textInput === '국내' || textInput === '항일' ){
                code = 'UGC00005'
            }else if (textInput === '의열투쟁' || textInput === '의열' || textInput === '투쟁' ){
                code = 'UGC00006'
            }else if (textInput === '학생운동'|| textInput === '학생' ){
                code = 'UGC00007'
            }else if (textInput === '광복군'||textInput === '광복' ){
                code = 'UGC00008'
            }else if (textInput === '계몽운동' || textInput === '계몽' ){
                code = 'UGC00009'
            }else if (textInput === '임시정부'|| textInput === '임시' || textInput === '정부' ){
                code = 'UGC00010'
            }else if (textInput === '일본방면' || textInput === '일본' ){
                code = 'UGC00011'
            }else if (textInput === '만주방면' || textInput === '만주' ){
                code = 'UGC00012'
            }else if (textInput === '중국방면' || textInput === '중국' ){
                code = 'UGC00013'
            }else if (textInput === '노령방면' || textInput === '노령' ){
                code = 'UGC00014'
            }else if (textInput === '미주방면' || textInput === '미주' ){
                code = 'UGC00015'
            }else if (textInput === '인도네시아방면' || textInput === '인도네시아' ){
                code = 'UGC00017'
            }else if (textInput === '독립운동지원' || textInput === '독립운동'  || textInput === '독립'  ){
                code = 'UGC00023'
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
        console.log(params,selectOption,code,'param')
        return params;
    };


    const handleSearchFilter = async () => {
        setPage(1)
        searchPageQuery()
        fetchedData = await fetchHonorData(params);
        setData(fetchedData);
 
    }

    return (

        <div className={'w-full flex justify-center px-5 py-3'} >
            <div className={'w-1280 flex-col '}>
            <div className={'flex justify-center items-center font-bold text-2xl py-10'}>훈격 기준: {pageTitle}</div>
            <div className={'flex justify-end mb-2'}>
                <SearchSelect classes={'mr-2 cursor-pointer'} width={'150px'} options={options}  onChange={(value) => selectValue(value)} />
                <SearchInput classes={'mr-2'} width={'300px'}  onChange={(value)=>inputValue(value)}/>
                <button className={'search__btn'} onClick={handleSearchFilter}>검색</button>
            </div>
            <div className={'flex flex-wrap'}>
                {data?.ITEMS.map((item: any) => (
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
                                성명: {item.MNG_NO !== '4987' ? item.NAME_KO : '-'}{item.MNG_NO !== '4987' ? `(${item.NAME_CH})`:''}
                            </div>
                            <p className={'text-sm leading-6'}>성별: { item.MNG_NO !== '4987' ? item.SEX:'-'}</p>
                            <p className={'text-sm leading-6'}>생년월일: {item.MNG_NO !== '4987' ? item.BIRTHDAY:'-'}</p>
                            <p className={'text-sm leading-6'}>사망년월일: {item.MNG_NO !== '4987' ?item.LASTDAY:'-'}</p>
                            <p className={'text-sm leading-6'}>포상년도: {item.MNG_NO !== '4987' ? item.JUDGE_YEAR :'-'}년</p>
                            <p className={'text-sm leading-6'}>본적: {item.MNG_NO !== '4987' ?item.REGISTER_LARGE_DIV:'-'} {item.MNG_NO !== '4987' ?item.REGISTER_MID_DIV:''}</p>
                            <p className={'text-sm leading-6'}>운동계열: {item.MNG_NO !== '4987' ?item.WORKOUT_AFFIL:'-'}</p>
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