import classnames from "classnames";

export default function onCheckActiveLink(pathname, href) {
  const isActive = pathname === href || pathname === `${href}/`;
  return classnames(
    "no-underline font-[0.875rem] hover:text-primary-2/40 duration-500 leading-[1.375rem]",
    {
      "text-primary-0": isActive,
      "text-black": !isActive,
    },
  );
}
