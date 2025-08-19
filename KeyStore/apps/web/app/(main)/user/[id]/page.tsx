import Profile from "@/components/user/profile";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Order from "@/components/user/order";

export default async function User({ params }: any) {
  return (
    <div className="pt-20">
      <div id={params.id}>
        <Profile></Profile>
        <div className="min-h-screen bg-gray-900 text-white p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold mb-8">My orders</h1>
            <Order></Order>
          </div>
        </div>
      </div>
    </div>
  );
}
