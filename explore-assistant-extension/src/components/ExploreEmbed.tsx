/*

MIT License

Copyright (c) 2023 Looker Data Sciences, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/


import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { LookerEmbedSDK } from '@looker/embed-sdk';
import { ExtensionContext } from '@looker/extension-sdk-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export interface ExploreEmbedProps {}

const processUrlParams = (exploreUrl: string): { [key: string]: string } => {
  const paramsObj: { [key: string]: string } = {};

  exploreUrl.split('&').forEach(param => {
    let decodedKey;
    let decodedValue;
    try {
      const [key, ...rest] = param.split('=');
      decodedKey = decodeURIComponent(key);
      decodedValue = decodeURIComponent(rest.join('=')).replace(/\+/g, ' ');
    } catch (e) {
      console.error('Error decoding URL parameter segment:', param);
      return;
    }

    // Handle JSON objects directly as strings
    if ((decodedValue.startsWith('{') && decodedValue.endsWith('}')) || 
        (decodedValue.startsWith('[') && decodedValue.endsWith(']'))) {
      paramsObj[decodedKey] = decodedValue;
    } else {
      paramsObj[decodedKey] = decodedValue;
    }
  });

  return paramsObj;
};

export const ExploreEmbed = ({}: ExploreEmbedProps) => {
  const { extensionSDK } = useContext(ExtensionContext);
  const [exploreRunStart, setExploreRunStart] = React.useState(false);

  const { exploreUrl, exploreId } = useSelector(
    (state: RootState) => state.assistant,
  );

  const canceller = (event: any) => {
    return { cancel: !event.modal };
  };

  const ref = useRef<HTMLDivElement>(null);

  const handleQueryError = () => {
    setTimeout(() => !exploreRunStart && animateExploreLoad(), 10);
  };

  const animateExploreLoad = () => {
    document.getElementById('embedcontainer')?.style.setProperty('opacity', '1');
  };

  const setExploreLoading = (_explore: any) => {};

  useEffect(() => {
    const hostUrl = extensionSDK?.lookerHostData?.hostUrl;
    const el = ref.current;
    if (el && hostUrl && exploreUrl) {
      const paramsObj = {
        embed_domain: hostUrl,
        sdk: '2',
        _theme: JSON.stringify({
          key_color: '#174ea6',
          background_color: '#f4f6fa',
        }),
      };

      console.log('exploreUrl before decoding:', exploreUrl);

      const decodedParams = processUrlParams(exploreUrl);
      console.log('Decoded params:', decodedParams);

      // Ensure specific fields are left as decoded without re-encoding
      const finalParams: { [key: string]: string } = {};
      for (const key in decodedParams) {
        if (decodedParams.hasOwnProperty(key)) {
          if (key.includes('filter_config') || key.includes('vis') || key.includes('fields') 
              || key.startsWith('f[')) {
            finalParams[key] = decodedParams[key]; // Do not re-encode JSON params, fields, or filters
          } else {
            finalParams[key] = encodeURIComponent(decodedParams[key]).replace(/%20/g, ' ');
          }
        }
      }
      console.log('Final processed params:', finalParams);

      el.innerHTML = '';
      LookerEmbedSDK.init(hostUrl);
      LookerEmbedSDK.createExploreWithId(exploreId)
        .appendTo(el)
        .withClassName('looker-embed')
        .withParams(finalParams)
        .on('explore:ready', handleQueryError)
        .on('drillmenu:click', canceller)
        .on('drillmodal:explore', canceller)
        .on('explore:run:start', () => {
          setExploreRunStart(true);
          animateExploreLoad();
        })
        .on('explore:run:complete', () => setExploreRunStart(false))
        .build()
        .connect()
        .then((explore) => setExploreLoading(explore))
        .catch((error: Error) => {
          console.error('Connection error', error);
          // Additional debug information on error
          console.error('Params Obj on Connection Error:', finalParams);
        });
    }
  }, [exploreUrl]);

  return (
    <>
      <EmbedContainer id="embedcontainer" ref={ref} />
    </>
  );
};

const EmbedContainer = styled.div<{}>`
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
  animation: fadeIn ease-in ease-out 3s;
  > iframe {
    width: 100%;
    height: 100%;
    display: block;
    background-color: #f7f7f7;
  }
`;