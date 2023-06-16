import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { PropsWithChildren } from "react";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: V2_MetaFunction = () => {
  const description = "This is a Form site";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "That is a form site" },
  ];
};

export default function App({
  children,
  title,
}: PropsWithChildren<{ title?: string }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />

        <meta name="keywords" content="Fun, Forms" />
        <meta
          name="twitter:image"
          content="https://mysite.com/twitter-card.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="FORMs" />
        <meta name="twitter:site" content="FORMs" />
        <meta name="twitter:title" content="FORMs" />

        <Meta />
        {title ? <title>{title}</title> : null}
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
