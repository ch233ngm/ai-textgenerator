import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  // 等待 Promise 解析以获取实际的 locale 值
  const locale = await requestLocale;
  // console.log('getRequestConfig', locale);
  
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});