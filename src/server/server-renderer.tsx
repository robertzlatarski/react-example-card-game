import * as React from 'react';
import * as Express from 'express';
import * as path from 'path';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import App from '../client/App';
import Html from '../client/Html';

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
  const body = renderToString(<App />);
  const title = 'Server1 side Rendering1';

  const assets = getAssets();
  const jsAssets: string[] = getJsAssets(assets);

  const html = renderToStaticMarkup(
    <Html body={body} title={title} scripts={jsAssets} />
  );

  res.status(200).send('<!doctype html>' + html);
};

export default serverRenderer;
