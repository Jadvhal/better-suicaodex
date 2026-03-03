import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitorCog, NotepadText, ServerOffIcon } from "lucide-react";
// import Notifications from "@/components/Notifications/notifications";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Streamdown } from "streamdown";
const items = [
  {
    value: "data_src_change",
    trigger: "01/03/2026 - Data source change",
    content:
      "Vì nhiều lý do, từ giờ SuicaoDex sẽ sử dụng [WeebDex API](https://api.weebdex.org/docs).\n\nDù sao thì, xin được gửi lời cảm ơn cuối cùng đến đội ngũ MangaDex. Ai cũng liêm cho đến khi liêms 🥀",
  },
  {
    value: "user_data",
    trigger: "01/03/2026 - Tài khoản và dữ liệu người dùng",
    content:
      "Về lý thuyết, tài khoản và dữ liệu người dùng của SuicaoDex là riêng biệt với MangaDex, vì vậy việc đổi API kể trên đúng ra phải ~~không ảnh hưởng gì~~.\n\nNhưng vì tôi code đần nên dữ liệu về truyện đã lưu của bạn sẽ tạm không thể sử dụng được, cụ thể vui lòng xem bên dưới.",
  },
  {
    value: "what_affected",
    trigger: "01/03/2026 - Vậy có những gì bị ảnh hưởng?",
    content:
      "I will try to fix the issues below in the future, but no timeline yet 🐧 \n\n| Feature | Status | Details |\n|---|---|---|\n| Link | ❌ Unavailable | Links using MangaDex uuid (vd: `https://suicaodex.com/manga/56958579-6d1b-4db0-be4f-dd17b828fcf`) will not be accessible. |\n| Library & Reading History | ⚠️ Limited | Manga saved to account/device and reading history before **02/03/2026** will not be displayed; the Save manga to account feature is temporarily disabled. |\n| New chapter notifications | 🔕 Temporarily disabled | Was already unstable, temporarily disabled to find a better solution. |\n| Recommendations & Rankings | 📴 Temporarily hidden | WeebDex only recently started operating, not enough data to calculate. |\n| Comments | ⚠️ Limited | Comments trước **02/03/2026** will still appear in the `Comments gần đây`, but will not appear in manga using the new API. Comments mới từ sau **02/03/2026** work normally. |",
  },
];

// interface pageProps {
//   searchParams: Promise<{
//     [key: string]: string | undefined;
//   }>;
// }

export const metadata: Metadata = {
  title: "Notifications",
};

export default async function Page() {
  // const { page } = await getSearchParams({ searchParams });
  const tabValues = [
    {
      value: "noti",
      label: "Truyện",
      icon: <NotepadText size={16} className="mr-1" />,
    },
    {
      value: "system",
      label: "Hệ thống",
      icon: <MonitorCog size={16} className="mr-1" />,
    },
  ];
  return (
    <>
      <div>
        <hr className="w-9 h-1 bg-primary border-none" />
        <h1 className="text-2xl font-black uppercase">Notifications</h1>
      </div>

      <Tabs defaultValue="system" className="mt-4">
        <TabsList className="w-full">
          {tabValues.map((tab) => (
            <TabsTrigger
              key={tab.value}
              className="w-full flex items-center"
              value={tab.value}
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="noti">
          <Empty className="bg-muted/30 h-full mt-2">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <ServerOffIcon />
              </EmptyMedia>
              <EmptyTitle>Feature tạm thời không khả dụng</EmptyTitle>
              <EmptyDescription className="max-w-xs text-pretty">
                Temporarily disabled cái này để bảo trì, chịu khó đợi nhé 🤪
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          {/* <Accordion
            type="single"
            collapsible
            className="bg-secondary rounded-md px-2 mb-2"
          >
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="py-2">
                <div className="flex items-center gap-1.5">
                  <CircleHelp size={18} /> Có thể bạn cần biết:
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                New manga notifications are stored on your device; if you
                clear browser data, notifications will also be cleared.
                <br />
                Due to this limitation, sometimes there won't be a notification even if the manga
                có chương mới
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Notifications page={page} /> */}
        </TabsContent>
        <TabsContent value="system">
          <Accordion
            type="multiple"
            className=""
            defaultValue={["data_src_change", "user_data", "what_affected"]}
          >
            {items.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="font-semibold uppercase">
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent>
                  <Streamdown
                    controls={{ table: false }}
                    linkSafety={{ enabled: false }}
                    className="**:data-[streamdown='table-wrapper']:grid!"
                  >
                    {item.content}
                  </Streamdown>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </>
  );
}

// const getSearchParams = async ({ searchParams }: pageProps) => {
//   const params = await searchParams;
//   let page = params["page"] ? parseInt(params["page"]) : 1;
//   if (page < 1) page = 1;

//   return { page };
// };
