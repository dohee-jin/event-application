// 백엔드 로컬서버의 포트번호
const LOCAL_PORT = 9000;

/*
    요청 클라이언트의 호스트 주소 가져오기
    현재 클라이언트의 주소가
    1) http://localhost:5173 -> clientHostName: localhost
    2) https://google.com -> clientHostName: google
 */
const clientHostName = window.location.hostname;


// 백엔드 호스트를 동적 설정
let backendHostName;
if(clientHostName === 'localhost') {
    backendHostName = `http://localhost:${LOCAL_PORT}`;
} else if(clientHostName === 'strawberry.com') {
    backendHostName = `http://api.berry.com`;
}

// 기본 API 엔드포인트 저장
const API_BASE_ENDPOINT = `${backendHostName}/api`;

// API 리소스별 엔드포인드
const EVENT = `/events`;
const AUTH = `/auth`;

// http://localhost:9000/api/events
export const EVENT_API_URL = `${API_BASE_ENDPOINT}${EVENT}`;
export const AUTH_API_URL = `${API_BASE_ENDPOINT}${AUTH}`;