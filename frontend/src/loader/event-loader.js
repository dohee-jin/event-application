import {EVENT_API_URL} from "../config/host-config.js";
import {redirect} from "react-router-dom";

export const eventListLoader = async () => {
    const response = await fetch(`${EVENT_API_URL}`);

    // 로더가 리턴한 데이터는 라우티된 페이지와 그 하위 컴포넌트에서 언제든 사용가능
    // 로더는 fetch 결과를 바로 리턴하는 경우 알아서 json을 추출한다.
    return response;
}

export const eventItemLoader = async ({ params }) => {
    const response = await fetch(`${EVENT_API_URL}/${params.eventId}`)
    return response;
}

// 토큰 데이터를 파싱하는 함수
const parseUserData = () => JSON.parse(localStorage.getItem('userData'));

// 로컬 스토리지의 토큰 데이터를 불러오는 로더
export const userDataLoader = () => parseUserData();

const isLoggedIn = () => parseUserData() !== null;

// 로그인 여부를 검사하여 로그인하지 않았다면 로그인 페이지로 돌려보내는 로더
export const authCheckLoader = () => {
    if(!isLoggedIn())
    {
        alert('로그인이 필요한 서비스입니다.');
        return redirect('/');
    }
    return null; // 현재 페이지에 머물게 함
}

// 로컬 스토리지에서 토큰 값을 뽑아주는 함수
export const getUserToken = () => parseUserData()?.token;