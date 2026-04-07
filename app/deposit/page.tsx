import DepositView from "@/views/deposit/page";
import { getSystemSettings } from "@/app/actions/settings";

export default async function Deposit() {
    const settings = await getSystemSettings();
    return <DepositView settings={settings} />;
}
