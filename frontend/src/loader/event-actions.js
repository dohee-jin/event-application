import {redirect} from "react-router-dom";
import {EVENT_API_URL} from "../config/host-config.js";

export const saveAction = async ({ request, params }) => {
   // const formData = new FormData(e.target);
    console.log(request)
    // form에 입력한 값 가져오기
    // await를 붙여서 비동기적인 기능순서에서 순서를 보장해줌
    const formData = await request.formData();
    // 서버로 보낼 payload
    const payload = {
        title: formData.get('title'),
        desc: formData.get('description'),
        beginDate: formData.get('date'),
        imageUrl: formData.get('image')
    };
    // console.log(payload);

    let requestUrl = `${EVENT_API_URL}`;
    if(request.method === 'PUT') {
        requestUrl += `/${params.eventId}`
    }

    const response = await fetch(requestUrl, {
        method: request.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(!response.ok) {
        throw new Error('이벤트 생성에 실패했습니다!')
    }

    // 목록페이지로 리다이렉트
    // action 함수에서만 제공하는 함수
    return redirect('/events');

};

// 삭제 처리 action 함수
export const deleteAction = async ({ params }) => {
    if(!confirm(`정말 삭제하시겠습니까? `)) return;

    console.log('삭제 액션 함수 호출')
    const response = await fetch(`${EVENT_API_URL}/${params.eventId}`, {
        method: 'DELETE',
    })
    if(response.ok) return redirect('/events');


}