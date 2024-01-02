import classnames from "classnames";

export function onCheckActiveLink(pathname, href) {
  const isActive = pathname === href || pathname === `${href}/`;
  return classnames(
    "no-underline font-[0.875rem] hover:text-primary-2/40 duration-500",
    {
      "text-primary-0": isActive,
      "text-black": !isActive,
    },
  );
}
