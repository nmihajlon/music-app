import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user) return;

      try {
        console.log(user);
        await api.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in auth callback");
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);

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
