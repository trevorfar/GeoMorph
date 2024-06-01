import {ReduxProviders} from "./GlobalRedux/provider";
import "../styles/globals.css";

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ReduxProviders>{children}</ReduxProviders>
      </body>
    </html>
  );
}
