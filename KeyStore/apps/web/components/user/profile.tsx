"use client";
import React from "react";
import { useAuth } from "@/context";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/utils";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 !p-8">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Profile Avatar */}
        <div className="relative">
          <Avatar className="w-24 h-24 bg-gray-800 border-2 border-gray-700">
            <AvatarFallback className="bg-gray-800">
              <User className="w-10 h-10 text-blue-400" />
            </AvatarFallback>
          </Avatar>
        </div>
        {user ? (
          <div className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">{user.username}</h1>
            </div>

            {/* Member Since */}
            <p className="text-gray-400 text-sm">
              Member since: {formatDate(user.createdAt)}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Username Skeleton */}
            <div className="h-8 w-32 bg-gray-700 animate-pulse rounded-lg mx-auto"></div>

            {/* Member Since Skeleton */}
            <div className="h-5 w-40 bg-gray-700 animate-pulse rounded-lg mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
