"use client";

import { updateUserInfo } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const PersonalDetails = ({ userInfo }) => {
  const [info, setInfo] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    email: userInfo?.email || "",
    designation: userInfo?.designation || "",
    bio: userInfo?.bio || "",
  });
  const [loading, setLoading] = useState(false);
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserInfo(userInfo?.email, info);
      toast.success("Profile updated successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };
  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
      <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
      <form onSubmit={handleUpdate}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">
              First Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="First Name:"
              id="firstName"
              name="firstName"
              value={info.firstName}
              onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Last Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Last Name:"
              name="lastName"
              id="lastName"
              value={info.lastName}
              onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Your Email : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={info.email}
              disabled
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Designation :</Label>
            <Input
              name="designation"
              id="designation"
              type="text"
              placeholder="Designation :"
              value={info.designation}
              onChange={(e) =>
                setInfo({ ...info, designation: e.target.value })
              }
            />
          </div>
        </div>
        {/*end grid*/}
        <div className="grid grid-cols-1">
          <div className="mt-5">
            <Label className="mb-2 block">Bio :</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Bio :"
              value={info?.bio}
              onChange={(e) => setInfo({ ...info, bio: e.target.value })}
            />
          </div>
        </div>
        {/*end row*/}
        <Button className="mt-5 cursor-pointer" asChild disabled={loading}>
          <input type="submit" name="send" value="Save Changes" />
        </Button>
      </form>
      {/*end form*/}
    </div>
  );
};

export default PersonalDetails;
