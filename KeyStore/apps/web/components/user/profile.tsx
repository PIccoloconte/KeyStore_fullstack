"use client";
import React from "react";
import { useAuth } from "@/context";
import { User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/utils";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 p-8">
      <div className="flex flex-col items-center space-y-6 text-center">
        {/* Profile Avatar */}
        <div className="relative">
          <Avatar className="w-24 h-24 bg-gray-800 border-2 border-gray-700">
            <AvatarFallback className="bg-gray-800">
              <User className="w-10 h-10 text-blue-400" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
        </div>

        {/* Member Since */}
        <p className="text-gray-400 text-sm">{`Member since: ${formatDate(
          user?.createdAt ?? ""
        )}`}</p>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-6">
          {/* Steam-like icon */}
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="w-5 h-5 bg-blue-400 rounded-sm"></div>
          </div>

          {/* Discord-like icon */}
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="w-5 h-5 bg-indigo-400 rounded-full"></div>
          </div>

          {/* EA-like icon */}
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="w-5 h-5 bg-red-500 rounded-sm"></div>
          </div>

          {/* YouTube icon */}
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="w-5 h-5 text-red-500" />
          </div>

          {/* Twitch icon */}
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="w-5 h-5 text-purple-500" />
          </div>

          {/* Discord icon */}
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
            <div className="w-5 h-5 bg-indigo-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
