import LocalStorageSaveLoadAdapter from "../utils/LocalStorageSaveLoadAdapter";

export const configurationData = {
  supported_resolutions: [
    "1",
    "3",
    "5",
    "15",
    "30",
    "60",
    "240",
    "1D",
    "1W",
    "1M",
  ],
  intraday_multipliers: [
    "1",
    "3",
    "5",
    "15",
    "30",
    "60",
    "240",
    "1D",
    "1W",
    "1M",
  ],
  exchanges: [
    {
      value: "OVC",
      name: "OVC",
      desc: "OVC",
    },
  ],
  symbols_types: [
    {
      name: "futures",
      value: "futures",
    },
  ],
};

export const options = {
  overrides: {
    "mainSeriesProperties.candleStyle.upColor": "#f44a57",
    "mainSeriesProperties.candleStyle.downColor": "#4f7ded",
    "mainSeriesProperties.candleStyle.borderUpColor": "#f44a57",
    "mainSeriesProperties.candleStyle.borderDownColor": "#4f7ded",
    "mainSeriesProperties.candleStyle.borderColor": "#378658",
    "mainSeriesProperties.candleStyle.wickUpColor": "#f44a57",
    "mainSeriesProperties.candleStyle.wickDownColor": "#4f7ded",
    volumePaneSize: "medium", // 거래량 창의 크기 설정
  },
  studies_overrides: {
    "volume.volume.color.0": "#4f7ded", // 거래량 하락 색상
    "volume.volume.color.1": "#f44a57", // 거래량 상승 색상
    "volume.volume.transparency": 30, // 거래량 투명도
    "volume.volume ma.color": "#4e4e4e", // 이동 평균선 색상
    "volume.volume ma.transparency": 30, // 이동 평균선 투명도
  },
  studies: ["volume@tv-basicstudies"], // 거래량 표시
  fullscreen: false,
  width: "100%",
  height: "100%",
  interval: "1",
  timezone: "Asia/Seoul",
  debug: false,
  header_widget_buttons_mode: "adaptive",
  precision: 100000,
  disabled_features: ["header_symbol_search", "header_compare"],
  clear_price_scale_on_error_or_empty_bars: true,
  items_favoriting: true,
  hide_resolution_in_legend: true,
  volume_force_overlay: false,
  time_frames: [
    {
      text: "1D",
      resolution: "10",
      description: "1 일",
    },
    {
      text: "1H",
      resolution: "1",
      description: "1 시간",
    },
  ],
  // 로컬스토리지 저장 API
  load_last_chart: true,
  save_load_adapter: new LocalStorageSaveLoadAdapter(),
  enabled_features: [
    "study_templates",
    // "use_localstorage_for_settings"
  ],
  // charts_storage_url: null,
  // charts_storage_api_version: "1.1",
};
