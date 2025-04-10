import { create } from 'zustand';
import {getUserPnt} from "../utils/api";

const useCommonStore = create((set) => ({
  shouldFetchData: false, // 데이터 갱신 여부
  triggerFetch: () => set({ shouldFetchData: true }), // 데이터 갱신 트리거
  resetFetch: () => set({ shouldFetchData: false }), // 데이터 갱신 상태 초기화

  myPoint: 0, // 보유 자산 정보
  fetchMyPoint: async () => {
    try {
      const response = await getUserPnt();
      set({ myPoint: response.toLocaleString() }); // 보유 자산 정보를 상태로 저장
    } catch (error) {
      console.error("자산 정보를 불러오는 데 실패했습니다.", error);
    }
  },

}));

export default useCommonStore;
