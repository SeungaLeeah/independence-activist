import {ImQuotesLeft} from "react-icons/im";
import {ImQuotesRight} from "react-icons/im";

export default function Home() {
  return (
      <>
        <div className={'w-full min-h-screen flex justify-center items-center '}>
          <div className={'intro_bg px-16'}>
          <div className={'flex-col leading-loose'}>
            <div className={'flex-col'}>
              <p className={'flex'}>
                <ImQuotesLeft/>&nbsp;나는 우리나라가 세계에서 가장 아름다운 나라가 되기를 원한다. 가장 부강한 나라가 되기를 원하는 것은 아니다.
              </p>
              <p className={'pl-6'}>내가 남의 침략에 가슴이 아팠으니 내 나라가 남을 침략하는 것을 원치 아니한다.</p>
              <p className={'pl-6'}>우리의 부(富)력이 우리의 생활을 풍족히 할 만하고, 우리의 강(强)력이 남의 침략을 막을 만하면 족하다.</p>
              <p className={'pl-6'}>오직 한없이 가지고 싶은 것은 높은 문화의 힘이다.</p>
              <p className={'flex pl-6'}>문화의 힘은 우리 자신을 행복하게 하고, 나아가선 남에게 행복을 주기 때문이다.&nbsp;<ImQuotesRight/></p>
            </div>
            <p className={'font-bold mt-2 pl-6'}>- 김구(1876~1949)-대한민국 임시정부 주석</p>
          </div>
          </div>
        </div>
      </>
  );
}
