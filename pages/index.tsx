import Head from "next/head";
import IframeWrap from "components/iframe-wrap";

export default function App() {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Adapter Iframe</title>
      </Head>
      <div className="my-6">
        <h3 className="text-xl">
          解决同域下 iframe 滚动条问题 (查看详情更改 iframe 内部高度)
        </h3>
      </div>

      <p>adapter iframe 不会出现滚动条</p>
      <p className="text-sm text-gray-500 pt-2 pb-1">
        使用 MutationObserver 实时监听 iframe 内部高度，再通过 postMessage
        同步高度到 iframe 标签上。
      </p>
      <IframeWrap src="/adapter-iframe" width="100%" height="600" />

      <h5 className="mt-10 pb-1">正常的 iframe 出现滚动条</h5>
      <iframe src="/normal-iframe" width="100%" height="600" />
    </div>
  );
}
