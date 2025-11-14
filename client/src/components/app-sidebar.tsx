import * as React from "react"
import { LayoutDashboardIcon, Minus, Plus } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "../components/ui/sidebar"
import { Link } from "react-router-dom"



// This is sample data.
const data = {

  navMain: [
    {
      title: "Your Profile",
      url: "#",
      items: [
        {
          title: "Profile Overview",
          url: "/dashboard/profile",
        },
      ],
    },
    {
      title: "Your Tasks",
      url: "#",
      items: [
        {
          title: "Your tasks",
          url: "/dashboard/tasks",
        },
        {
          title: "Create task",
          url: "/dashboard/create-task",
        },

      ],
    },
  ],
  navSecondary: [
    {
      title: "Your Profile",
      url: "#",
      items: [
        {
          title: "Profile Overview",
          url: "/dashboard/profile",
        },
      ],
    },
    {
      title: "All Users",
      url: "#",
      items: [
        {
          title: "All users",
          url: "/dashboard/users",
        },
      ],
    },
    // {
    //   title: "Tasks",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Your tasks",
    //       url: "/dashboard/tasks",
    //     },
    //     {
    //       title: "Create task",
    //       url: "/dashboard/create-task",
    //     },

    //   ],
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = localStorage.getItem("user");
  const userType = user ? JSON.parse(user).user.userType : null;
  const navItems = userType && userType === "regular" ? data.navMain : data.navSecondary;
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-sm">
                  <LayoutDashboardIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold uppercase">Dashboard</span>
                  {/* <span className="">v1.0.0</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                            >
                              <Link to={item.url}>{item.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
