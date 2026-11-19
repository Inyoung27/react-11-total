import "styled-components";
import type { ThemeType } from "./theme.ts";

declare module "styled-components" {
    export interface DefaultTheme extends ThemeType {}
}
