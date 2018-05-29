import * as React from 'react';

interface Props {
  readonly body: string;
  readonly title: string;
  readonly scripts: string[];
}

const Html: React.SFC<Props> = ({ body, title, scripts }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />

      <title>{title}</title>
    </head>
    <body>
      <div
        id="root"
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
      {scripts.map(script => <script key={script} src={script} />)}
    </body>
  </html>
);

export default Html;
