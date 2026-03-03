"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NoPrefetchLink from "../Custom/no-prefetch-link";
import { useTranslation } from "@/lib/i18n";

export function NavSupports({
  supports,
}: {
  supports: {
    name: string;
    url: string;
    icon: React.ComponentType<any>;
  }[];
}) {
  const t = useTranslation();
  //   const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel>{t.nav.feedbackReport}</SidebarGroupLabel>
      <SidebarMenu>
        {supports.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name}>
              <a href={item.url} target="_blank">
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuAction>
              <SquareArrowOutUpRight />
            </SidebarMenuAction>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
