import { Alex_Brush, Nunito, Roboto } from "next/font/google";

const alex = Alex_Brush({
    weight: "400",
    display: "swap",
    variable: "--alex",
    subsets: ["latin"]
});

const nunito = Nunito({
    subsets: ["latin"],
    display: "swap",
    variable: "--nunito",
    weight: ["200", "300", "400", "500", "700", "800", "900"]
})

const roboto = Roboto({
    subsets: ["latin"],
    display: "swap",
    variable: "--roboto",
    weight: ["100", "300", "400", "500", "700", "900"]
});

export { alex, nunito, roboto}