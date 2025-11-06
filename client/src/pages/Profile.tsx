
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, } from '../components/ui/card'

export default function Profile() {
    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState(true)

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    useEffect(() => {
        if (!user || !user.token) {
            window.location.href = "/login";
        }
        setData(user?.user);
        setLoading(false);
    }, []);


    if (!data && loading) {
        return (
            <p className="text-center text-red-500 font-medium">Failed to load user data</p>
        )
    }

    return (
        <section>
            <div className="max-w-2xl mx-auto p-6 space-y-6">
            {/* Profile Info */}
            <Card className="shadow-md rounded-2xl border">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">{data?.name}</CardTitle>
                    <p className="text-gray-500">{data?.email}</p>
                </CardHeader>
            </Card>
        </div>
        </section>
    )
}
