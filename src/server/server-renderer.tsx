import * as React from 'react';
import * as Express from 'express';
import * as path from 'path';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import App from '../client/App';
import Html from '../client/Html';
import { ServerStyleSheet } from 'styled-components';

const getAssets = () => {
  const assets = path.join(__dirname, '../../asset-manifest.json');
  let clientStats;
  try {
    // tslint:disable-next-line:no-var-requires
    clientStats = require(assets);
  } catch (ex) {
    throw new Error(`Fatal Error: client webpack stats not found at ${assets}`);
  }

  return clientStats;
};

const getJsAssets = (assets: object) =>
  Object.keys(assets)
    .filter(asset => /\.js$/.test(asset))
    .map(k => assets[k]);

const serverRenderer = (req: Express.Request, res: Express.Response) => {
  const sheet = new ServerStyleSheet();
  const body = renderToString(sheet.collectStyles(<App />));
  const title = 'Server side Rendering app';

  const assets = getAssets();
  const jsAssets: string[] = getJsAssets(assets);
  const styles = sheet.getStyleTags();

  const html = renderToStaticMarkup(
    <Html body={body} title={title} scripts={jsAssets} styles={styles} />
  );

  res.status(200).send('<!doctype html>' + html);
};

export default serverRenderer;
