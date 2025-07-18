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
        <Order></Order>
      </div>
    </div>
  );
}
