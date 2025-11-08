import { Separator } from "../components/ui/separator"
import {
    SidebarTrigger,
} from "../components/ui/sidebar"
import { ModeToggle } from "./Theme"
// import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Avatar } from "@radix-ui/react-avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
const Header = () => {
    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false);
    // const router = useNavigate();
    const logout = () => {
        localStorage.clear();
        toast.success("Logged out successfully");
        window.location.href = "/";
    };
    
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const parsedUser = JSON.parse(user);
            setEmail(parsedUser?.user.name)
        } else {
            console.log("No user in localStorage");
        }
    }, []);

    return (
        <section>
            <header className="flex w-full h-14 shrink-0 items-center justify-between gap-2 px-4 border-b">
                <section className="flex items-center justify-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                </section>
                <section className="flex items-center justify-center font-semibold gap-2">
                    <div className="flex items-center justify-center gap-2">
                        {email && (
                            <Avatar className="inline-flex border h-9 w-9 shrink-0 select-none items-center justify-center overflow-hidden bg-gray-500 rounded-full align-middle">
                                <span className="text-md font-bold flex items-center justify-center leading-none text-white">
                                    {email.charAt(0).toUpperCase()}
                                </span>
                            </Avatar>
                        )}
                        {email}
                    </div>
                    <ModeToggle />
                    {/* <LogOut onClick={logout} className=" dark:bg-white cursor-pointer dark:text-red-600 bg-red-600 text-white h-8 w-8 p-2 rounded-full " /> */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="cursor-pointer">
                                Logout
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Confirm Logout</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to log out? You will need to sign in again to access your account.
                                </DialogDescription>
                            </DialogHeader>

                            <DialogFooter className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => {
                                    setOpen(false);
                                    toast.info("Logout cancelled ❌");
                                }}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setOpen(false);
                                        logout();
                                    }}
                                >
                                    Log Out
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </section>
            </header>
        </section>
    )
}

export default Header