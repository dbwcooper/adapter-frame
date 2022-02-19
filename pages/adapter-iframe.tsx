import { useState, useCallback } from "react";
import Image from "next/image";

import Adapter from "components/adapter";

// B站 的外链
// https://blog.csdn.net/xinshou_caizhu/article/details/94028606
export default function Home() {
  const [visible, setVisible] = useState(false);
  const showMore = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);
  return (
    <div className="container mx-auto border border-[#b86a6d] p-4">
      <Adapter />
      <div className="text-sm text-gray-400">iframe 内部</div>
      <p className="py-6 text-[#b86a6d]">
        「今夜的月光如此清亮，不做些什么真是浪费。随我一同去月下漫步吧，不许拒绝。」——八重神子
      </p>
      <Image alt="八重神子" src="/Yae.png" width="1140" height="280" />
      <div>
        <a
          className="text-sky-600 hover:underline cursor-pointer"
          onClick={showMore}
        >
          查看详情
        </a>
        {visible ? (
          <div className="pt-2">
            <p className="py-1">
              「我曾于林中月下见到灵妙的仙狐之姿。万般变化，预示着未知与先知…犹如命运，照向我与无尽人世。」——雷电影
            </p>
            <p className="py-1">
              鸣神大社的大巫女、狐之血脉的延续者、「永恒」的眷属与友人…以及，轻小说出版社「八重堂」的恐怖总编。
            </p>
            <p className="py-1">
              不必追寻其中任何一面。每一面都是八重神子，每一面却也无法成为真正的她。
            </p>
            <p className="py-1">
              各种姿态，都犹如镜子的碎片，映射出截然不同的她。因诸多身份包裹，她亦成为了一块被无数面御镜包围的宝钻。
            </p>
            <p className="py-1">上百种面相，严肃或快活，悲悯或漠然。</p>
            <p className="py-1">
              无人知晓真实，就像无人能轻易从秘林中找到一只与过客擦肩的仙狐。
            </p>
            <p className="py-1">可若是狐狸注视着人…狐狸又将往何处去？</p>
          </div>
        ) : null}
      </div>

      <h3 className="py-2 text-lg">原神 2.5</h3>
      <div className="w-[600px]">
        <iframe
          src="//player.bilibili.com/player.html?bvid=BV1Er4y1h7FX&page=1&high_quality=1"
          width="100%"
          height="500"
          scrolling="no"
          frameBorder="0"
          sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
        ></iframe>
      </div>
    </div>
  );
}
