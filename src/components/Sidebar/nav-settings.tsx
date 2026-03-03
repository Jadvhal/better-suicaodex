"use client";

import { CloudOff } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeCustomizer } from "../Theme/theme-customizer";
import { ContentCustomizer } from "../Theme/content-customizer";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslation } from "@/lib/i18n";

export function NavSettings() {
  const t = useTranslation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="gap-2">
        <span>{t.settings.customize}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <CloudOff size={18} className="cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {t.settings.localOnlyNotice}
            </p>
          </TooltipContent>
        </Tooltip>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <ThemeCustomizer />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <ContentCustomizer />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
