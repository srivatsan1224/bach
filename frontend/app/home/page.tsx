import { authConfig, loginIsRequiredServer } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LogoutButton from "@/components/LogoutButton";
import UserForm from "@/components/UserForm";

export default async function Page() {
  await loginIsRequiredServer();
  const session = await getServerSession(authConfig);

  return (
    <div className="relative min-h-screen bg-gray-100 p-4">
      {session && <LogoutButton />}
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Welcome, {session?.user?.name}
        </h1>
        <UserForm />
      </div>
    </div>
  );
}
