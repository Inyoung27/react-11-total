export const LightTheme = {
    primary: "#d6628b", // 활성 메뉴 글자, 아이콘, 버튼
    activeBg: "#fde4ec", // 활성 메뉴 배경
    hoverBg: "#fdf0f4", // 마우스 올렸을 때
    background: "#fff5f7", // 페이지 배경
    card: "#ffffff", // 헤더, 카드 배경
    border: "#f8dbe4", // 테두리
    text: "#3d2c33", // 본문 글자
    subText: "#9a7f89", // 흐린 글자 (비활성 메뉴 등)
};

export const DarkTheme = {
    primary: "#f48fb1",
    activeBg: "#432633",
    hoverBg: "#36232b",
    background: "#1f1519",
    card: "#2b1d23",
    border: "#43303a",
    text: "#f7e8ee",
    subText: "#b79aa6",
};

export type ThemeType = typeof LightTheme;
