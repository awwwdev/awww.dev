import Lnk from "@/components/Lnk";

export const NavLink = ({ baseHref, page, label = page, icon = "" }) => {
  return (
    <Lnk
      className={`chip-link data-[in-sub-path=true]:(bg-orange9 c-orange1) capitalize ${icon}`}
      href={`${baseHref}/${page}`}
    >
      {label ?? label.replaceAll("-", " ")}
    </Lnk>
  );
};
