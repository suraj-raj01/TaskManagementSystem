import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import api from "../API"
import { toast } from "sonner"

export function CreateUsers({
}: React.ComponentProps<"div">) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('regular')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const payload = {
            name: name,
            email: email,
            password: password,
            userType:userType
        }

        try {
            const response = await axios.post(`${api}/users/register`, payload);
            // console.log(response.data);
            const user = response.data;
            localStorage.setItem("user", JSON.stringify(user, null, 2))
            toast.success(response.data.message || "Registration Successful ")
            navigate("/dashboard/users")
        } catch (err: any) {
            // console.log(err.response.data)
            setError(err.response.data.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <section className="flex flex-col md:mt-10 items-center justify-center p-0 md:p-6">
            <Card className="overflow-hidden mt-5 p-1 w-full md:px-5 md:w-3xl">
                <CardContent className="grid p-0 md:grid-cols-1">
                    <form onSubmit={handleSubmit} className="p-3 md:p-5">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Create User  </h1>
                                {/* <p className="text-muted-foreground">Create your account with us ?</p> */}
                            </div>

                            <div className="grid gap-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-1">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {/* <Link
                                        to="/forgetpassword"
                                        className="ml-auto font-semibold text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link> */}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label className='pb-2'>Status</Label>
                                <Select onValueChange={(val) => setUserType(val)} defaultValue="regular">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select user type" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="regular">Regular</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}

                            <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                                {loading ? 'Creating...' : 'Create User'}
                            </Button>

                           
                        </div>
                    </form>
                </CardContent>
            </Card>
            {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <Link to="#">Terms of Service</Link>{" "}
        and <a href="#">Privacy Policy</a>.
      </div> */}
        </section>
    )
}