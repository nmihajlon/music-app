import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";

const AuthCallback = () => {
  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin"></Loader>
          <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
          <p className="">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallback;
