import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-[60vh] py-10 bg-amazon-bg">
            <SignIn />
        </div>
    );
}
