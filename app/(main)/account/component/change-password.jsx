"use client";
import { changeUserPassword } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }) => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    reTypeNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password.newPassword !== password.reTypeNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await changeUserPassword(
        email,
        password.oldPassword,
        password.newPassword
      );
      toast.success("Password changed successfully");
      setPassword({ oldPassword: "", newPassword: "", reTypeNewPassword: "" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <form onSubmit={handleChangePassword}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              placeholder="Old password"
              required
              id="oldPassword"
              name="oldPassword"
              value={password.oldPassword}
              onChange={(e) =>
                setPassword({ ...password, oldPassword: e.target.value })
              }
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              placeholder="New password"
              required
              id="newPassword"
              name="newPassword"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
            />
          </div>
          <div>
            <Label className="mb-2 block">Re-type New password :</Label>
            <Input
              type="password"
              placeholder="Re-type New password"
              required
              id="reTypeNewPassword"
              name="reTypeNewPassword"
              value={password.reTypeNewPassword}
              onChange={(e) =>
                setPassword({ ...password, reTypeNewPassword: e.target.value })
              }
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5" type="submit" disabled={loading}>
          Change password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
