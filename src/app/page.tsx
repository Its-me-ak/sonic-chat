import ChatLayout from "@/components/chat/ChatLayout";
import PreferencesTab from "@/components/PreferencesTab";
import { cookies } from "next/headers";
import { redis } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { User } from "@/db/dummy";

async function getUsers(): Promise<User[]> {
  const userKeys: string[] = [];
  let cursor = "0";

  do {
    const [nextCursor, keys] = await redis.scan(cursor, {
      match: "user:*",
      type: "hash",
      count: 100,
    });
    cursor = nextCursor;
    userKeys.push(...keys);
  } while (cursor !== "0");

  // user:123 user:456 user:789

  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();

  const pipeline = redis.pipeline();
  userKeys.forEach((key) => {
    pipeline.hgetall(key);
  });
  const userData = (await pipeline.exec()) as User[];

  const users: User[] = [];
  for (const user of userData) {
    if (user.id !== currentUser?.id) {
      users.push(user);
    }
  }
  return users;
}

export default async function Home() {
  const cookieStore = await cookies();
  const layout = cookieStore.get("react-resizable-panels:layout");
  const initialLayout = layout ? JSON.parse(layout.value) : undefined;

  const { isAuthenticated } = getKindeServerSession();
  if (!(await isAuthenticated())) return redirect("/auth");

  const users = await getUsers();

  return (
    <main className="flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      {/* PreferencesTab */}
      <PreferencesTab />

      <div
        className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
				dark:bg-[size:20px_20px] bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px]"
        aria-hidden="true"
      />

      <div className="z-10 border rounded-lg max-w-5xl w-full min-h-[85vh] text-sm lg:flex">
        <ChatLayout initialLayout={initialLayout} users={users} />
      </div>
    </main>
  );
}
