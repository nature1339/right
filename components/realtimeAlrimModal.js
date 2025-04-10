//실시간 알림내역 모달
import React from 'react'

export default function realtimeAlrimModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="modal_wrap" id="modal_notice">
                <div className="modal">
                    <div className="modal_header">
                        <h2>실시간 알림 내역</h2>
                        <div className="close" onClick={() => onClose()}></div>
                    </div>
                    <div className="modal_body">
                        <div className="table_wrap">
                            <table>
                                <colgroup>
                                    <col width="100"/>
                                    <col />
                                </colgroup>
                                <thead>
                                <tr>
                                    <th>일자/시간</th>
                                    <th>알림 메시지</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <td>15:00</td>
                                    <td>5월 27일 (월) 메모리얼데이 해외선물 운영 안내</td>                                
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}