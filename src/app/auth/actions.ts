"use server";

import { prisma } from "@/lib/prisma";
import { login as setSession, logout as deleteSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please fill in all fields." };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { error: "Invalid email or password." };
  }

  await setSession({ id: user.id, email: user.email, role: user.role });
  
  if (user.role === 'ADMIN') {
    redirect("/admin");
  } else {
    redirect("/profile");
  }
}

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const adminCode = formData.get("adminCode") as string;

  if (!name || !email || !password) {
    return { error: "Please fill in all fields." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "User already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  // First user or those with the secret code "KSWADMIN2026" become admins
  const role = adminCode === "KSWADMIN2026" ? "ADMIN" : "USER";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  await setSession({ id: user.id, email: user.email, role: user.role });
  
  if (user.role === 'ADMIN') {
    redirect("/admin");
  } else {
    redirect("/profile");
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
