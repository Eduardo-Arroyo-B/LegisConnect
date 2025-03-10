import {
    Sidebar,
    SidebarContent,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
} from "@/components/ui/sidebar"
import menuContent from "@/helpers/MenuContent.ts";
import {Outlet} from "react-router-dom";


const Layout = () => {

    return(
        <>
            <SidebarProvider defaultOpen={false}>
                    <Sidebar collapsible="icon">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>Menu</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {menuContent.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <a href={item.path}>
                                                        <img src={item.icon} alt={item.title} className="w-[20px] h-[20px]"/>
                                                        <span>{item.title}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                <SidebarTrigger/>
                <Outlet/>
            </SidebarProvider>
        </>
    )
}

export default Layout