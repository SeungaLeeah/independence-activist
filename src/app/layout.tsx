import type { Metadata } from "next";

import "./style/globals.css";
import Header from '@/component/Header'


export const metadata: Metadata = {
    title: "독립운동가 인물사전",
    description: "독립운동가를 한눈에 찾아볼 수 있는 사이트",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <Header />
        <main>{children}</main>
        </body>
        </html>
    );
}