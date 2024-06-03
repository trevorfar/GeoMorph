import {ReduxProviders} from "./GlobalRedux/provider";
import "../styles/globals.css";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="">
        <ReduxProviders>{children}</ReduxProviders>
      </body>
    </html>
  );
}
