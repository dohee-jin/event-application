import {EVENT_API_URL} from "../config/host-config.js";

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