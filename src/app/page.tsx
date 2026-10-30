"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { animations } from "@/lib/animations";
import { COMPONENTS, TRIGGERS, CONTEXTS, TECHS } from "@/lib/types";
import { previewRegistry } from "@/components/AnimationRegistry";
import { Copy, ChevronUp } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [search, setSearch] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [component, setComponent] = useState("全部元件");
  const [trigger, setTrigger] = useState("全部時機");
  const [context, setContext] = useState("全部情境");
  const [tech, setTech] = useState("全部技術");
  const [groupBy, setGroupBy] = useState("comp");
  const [showModal, setShowModal] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (showModal) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [showModal]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    return animations.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.nameEn.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      const matchComp = component === "全部元件" || a.component === component;
      const matchTrig = trigger === "全部時機" || a.trigger === trigger;
      const matchCtx = context === "全部情境" || a.contexts.includes(context);
      const matchTech = tech === "全部技術" || a.tech === tech;
      return matchSearch && matchComp && matchTrig && matchCtx && matchTech;
    });
  }, [search, component, trigger, context, tech]);

  const grouped = useMemo(() => {
    if (groupBy !== "comp") return { all: filtered };
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((a) => {
      if (!groups[a.component]) groups[a.component] = [];
      groups[a.component].push(a);
    });
    return groups;
  }, [filtered, groupBy]);

  const copyPrompt = useCallback(async (item: (typeof animations)[0]) => {
    try {
      await navigator.clipboard.writeText(item.aiPrompt);
      setCopiedId(item.id);
      toast.success("已複製 ✓");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("複製失敗");
    }
  }, []);

  const clearFilters = () => {
    setSearch("");
    setComponent("全部元件");
    setTrigger("全部時機");
    setContext("全部情境");
    setTech("全部技術");
    setPreviewText("");
  };

  return (
    <div className="min-h-screen bg-[#0d0e11] text-[#f2f2f0]">
      <Toaster position="top-center" />
      {/* Header */}
      <header className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        <div className="text-xs tracking-widest text-white/50 mb-2">MOTION LIBRARY / 動態收藏</div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
          動態收藏 <span className="font-medium">Motion Library</span>
        </h1>
        <p className="text-sm md:text-base text-white/70 max-w-2xl leading-relaxed">
          收錄網頁上好看的動態效果，目前共 <span className="text-white font-medium">{animations.length}</span> 種。
          可以用「元件」和「時機」交叉篩選，例如「按鈕 × 懸停」、「卡片・群組 × 進場」。
          每格都是示意預覽，點「複製 AI 提示詞」可取得外觀與做法描述；互動類的效果可以直接用滑鼠移動、捲動或拖曳試玩。
        </p>
      </header>

      {/* Filters */}
      <div className="max-w-[1200px] mx-auto px-6 pb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="search"
            aria-label="搜尋動畫"
            placeholder="搜尋名稱、描述或標籤（例：翻牌、按鈕、Bounce）"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#17181d] border border-[#2a2c33] rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30"
          />
          <input
            type="text"
            aria-label="自訂預覽文字"
            maxLength={24}
            placeholder="自訂預覽文字（留空用原範例）"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            className="flex-1 bg-[#17181d] border border-[#2a2c33] rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30"
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            aria-label="元件"
            value={component}
            onChange={(e) => setComponent(e.target.value)}
            className="bg-[#17181d] border border-[#2a2c33] rounded-xl px-3 py-2 text-sm"
          >
            {COMPONENTS.map((c) => (
              <option key={c} value={c}>
                {c}（{c === "全部元件" ? animations.length : animations.filter((a) => a.component === c).length}）
              </option>
            ))}
          </select>
          <select
            aria-label="時機"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            className="bg-[#17181d] border border-[#2a2c33] rounded-xl px-3 py-2 text-sm"
          >
            {TRIGGERS.map((t) => (
              <option key={t} value={t}>
                {t}（{t === "全部時機" ? animations.length : animations.filter((a) => a.trigger === t).length}）
              </option>
            ))}
          </select>
          <select
            aria-label="情境"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="bg-[#17181d] border border-[#2a2c33] rounded-xl px-3 py-2 text-sm"
          >
            {CONTEXTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            aria-label="技術"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            className="bg-[#17181d] border border-[#2a2c33] rounded-xl px-3 py-2 text-sm"
          >
            {TECHS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select aria-label="分組方式" value={groupBy} onChange={e => setGroupBy(e.target.value)} className="bg-[#17181d] border border-[#2a2c33] rounded-xl px-3 py-2 text-sm"><option value="comp">依元件分組</option><option value="all">全部顯示</option></select>
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-white/60 hover:text-white flex items-center gap-1"
          >
            清除 <ChevronUp className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="text-sm text-white/50">顯示 {filtered.length} / {animations.length}</div>
      </div>

      {/* Cards */}
      <main className="max-w-[1200px] mx-auto px-6 pb-24">
        {Object.entries(grouped).map(([groupName, items]) => (
          <section key={groupName} className="mb-12">
            {groupBy === "comp" && groupName !== "all" && (
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                {groupName}
                <span className="text-sm font-normal text-white/50">{items.length} 種</span>
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => {
                const Preview = previewRegistry[item.previewComponent];
                return (
                  <article
                    key={item.id}
                    className="bg-[#17181d] border border-[#2a2c33] rounded-[18px] overflow-hidden hover:border-white/20 transition-colors"
                  >
                    <div className="h-[200px] relative bg-[#15161a] [container-type:inline-size]">
                      {Preview ? (
                        <Preview text={previewText || undefined} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-white/40">
                          Preview
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <div className="text-xs text-white/40 mb-0.5">{item.number}</div>
                          <div className="font-medium">
                            {item.name}{" "}
                            <span className="text-white/50 text-sm">{item.nameEn}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-white/70 mb-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10">{item.trigger}</span>
                        {item.contexts.slice(0, 2).map((c) => (
                          <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/60">
                            {c}
                          </span>
                        ))}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-white/50">{item.tech}</span>
                      </div>
                      <button
                        onClick={() => copyPrompt(item)}
                        className="w-full flex items-center justify-center gap-2 text-sm py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        {copiedId === item.id ? "已複製 ✓" : "複製 AI 提示詞"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/40">沒有符合條件的效果</div>
        )}
      </main>

      {/* Floating buttons */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:scale-105 transition-transform z-40"
      >
        我要投稿
      </button>

      {showBackTop && (
        <button
          aria-label="回到頂部"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 bg-[#17181d] border border-[#2a2c33] p-3 rounded-full z-40"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Submission Modal */}
      <dialog ref={dialogRef} onCancel={() => setShowModal(false)} onClose={() => setShowModal(false)} aria-labelledby="submission-title" className="fixed inset-0 m-auto w-full max-w-md bg-transparent p-4 text-[#f2f2f0] backdrop:bg-black/70">
          <div className="bg-[#17181d] border border-[#2a2c33] rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 id="submission-title" className="text-lg font-bold">投稿想收錄的效果</h3>
              <button aria-label="關閉投稿視窗" onClick={() => setShowModal(false)} className="text-white/50 hover:text-white">
                ×
              </button>
            </div>
            <p className="text-sm text-white/70 mb-4">此為表單示範，資料不會送出或保存。</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("示範完成，資料未送出或保存");
                setShowModal(false);
              }}
              className="space-y-3"
            >
              <input
                aria-label="效果名稱或描述" placeholder="效果名稱或描述"
                className="w-full bg-[#0d0e11] border border-[#2a2c33] rounded-lg px-3 py-2 text-sm"
                required
              />
              <input
                aria-label="參考連結（選填）" placeholder="參考連結（選填）" type="url"
                className="w-full bg-[#0d0e11] border border-[#2a2c33] rounded-lg px-3 py-2 text-sm"
              />
              <input
                aria-label="投稿人稱呼（選填）" placeholder="投稿人稱呼（選填）"
                className="w-full bg-[#0d0e11] border border-[#2a2c33] rounded-lg px-3 py-2 text-sm"
              />
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 rounded-lg border border-[#2a2c33] text-sm"
                >
                  取消
                </button>
                <button type="submit" className="flex-1 py-2 rounded-lg bg-white text-black text-sm font-medium">
                  送出投稿
                </button>
              </div>
            </form>
          </div>
      </dialog>

      {/* Footer */}
      <footer className="max-w-[1200px] mx-auto px-6 py-8 text-xs text-white/40 border-t border-[#2a2c33]">
        參考來源：threads.com/@ai_yunon_ai/post/DeeJRUjkXlM ・ threads.com/@ai_tjb/post/DeeHoA3ktZ5 ・
        名稱與描述屬原作者整理，預覽動畫為示意重製，僅供個人參考學習。GSAP 動畫以 GSAP 自行整理示範。
      </footer>
    </div>
  );
}
