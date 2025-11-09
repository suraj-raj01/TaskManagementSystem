import { useEffect } from "react";

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
        useEffect(() => {
            if (!user || !user.token) {
                window.location.href = "/login";
            }
        }, []);
    return (
        <div>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="bg-muted/50 border-2 aspect-video rounded-sm" />
                    <div className="bg-muted/50 border-2 aspect-video rounded-sm" />
                    <div className="bg-muted/50 border-2 aspect-video rounded-sm" />
                </div>
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
        </div>
    )
}

export default Dashboard