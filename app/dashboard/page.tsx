import DashboardView from "@/views/dashboard/page";
import { getUserProfile } from "@/app/actions/user";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const userProfile = await getUserProfile();

    if (!userProfile) {
        redirect("/login");
    }

    return <DashboardView userProfile={userProfile} />;
}
