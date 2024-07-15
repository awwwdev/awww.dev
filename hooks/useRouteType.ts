import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin-dashboard");
  const isTeacher = router.pathname.startsWith("/teacher-dashboard");
  const isPayer = router.pathname.startsWith("/payer-dashboard");
  const isUser = router.pathname.startsWith("/account");

  const type = isPayer ? "payer" : isTeacher ? "teacher" : isAdmin ? "admin" : isUser ? "user" : null;

  return { type, isAdmin, isPayer, isTeacher };
};
