import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useLogOut from "@/hooks/useLogOut";
import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import UserMeAvatar from "../UserMeAvatar";

export function AccountDropdownMenu({ userData }) {
  const router = useRouter();
  const { locale } = router;

  const logoutM = useLogOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variation="ghost">{locale === 'fa' ? userData.firstnameFa : userData.firstname}</Button> */}
        <button className="pis-2">
          <UserMeAvatar />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-gray1 " align="end">
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="bf-i-ph-user mie-2" />

            <Link href={`/account`}>My Account</Link>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {/* 
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>GitHub</DropdownMenuItem> */}
        <DropdownMenuItem>
          <Icon name="bf-i-ph-lifebuoy mie-2" />
          <Link href="/faq">Support</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={() => logoutM.mutate()} className="">
            <Icon name="bf-i-ph-sign-out mie-2" />
            Logout
          </button>
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
