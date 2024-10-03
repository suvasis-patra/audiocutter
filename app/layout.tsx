import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

const theme = createTheme({
  colors: {
    black: [
      "#F5F5F5",
      "#E0E0E0",
      "#BDBDBD",
      "#9E9E9E",
      "#757575",
      "#616161",
      "#424242",
      "#333333",
      "#212121",
      "#000000",
    ],
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
