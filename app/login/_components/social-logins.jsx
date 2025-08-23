import { handleSocialLogin } from "@/app/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const SocialLogins = () => {
  return (
    <>
      <div className="text-center text-md mt-3 text-gray-500">
        or sing in with
      </div>
      <form action={handleSocialLogin}>
        <div className="max-w-sm w-full mx-auto mt-4 ">
          <Button
            className="w-full"
            variant="outline"
            type="submit"
            value="google"
            name="action"
          >
            <Image
              src="/assets/google.svg"
              alt="google-icon"
              width={20}
              height={20}
              className="h-5 w-5 "
            />
            <span>Google</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export default SocialLogins;
