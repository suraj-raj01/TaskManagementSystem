
import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, } from '../components/ui/card'
import { ChartBarMultiple } from '../components/bar-chart';
import { ChartAreaStep } from '../components/area-chart';

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
            <div className="md:w-100 w-full p-2">
            {/* Profile Info */}
            <Card className="shadow-md rounded-sm border mb-5">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">{data?.name}</CardTitle>
                    <p className="text-gray-500 font-semibold">Email : {data?.email}</p>
                    <p className="text-gray-500 font-semibold">User type : {data?.userType=='admin'?'Admin':'Employee'}</p>
                </CardHeader>
            </Card>
        </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:w-full'>
                <ChartBarMultiple />
                <ChartAreaStep />
            </div>
        </section>
    )
}
