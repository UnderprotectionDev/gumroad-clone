import { cookies as getCookies } from "next/headers";

interface UtilsProps {
  prefix: string;
  value: string;
}

export const generateAuthCookie = async ({ prefix, value }: UtilsProps) => {
  const cookies = await getCookies();

  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
  });
};
