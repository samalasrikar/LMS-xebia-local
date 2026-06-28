import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend = "+0",
  color = "text-[#6C1D5F]",
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {value}
            </h2>

            <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">

              <TrendingUp
                size={14}
                className="text-green-600"
              />

              <span className="font-medium text-green-600">
                {trend}
              </span>

              <span>this month</span>

            </div>

          </div>

          <div className="rounded-xl bg-[#F0DAEA] p-3">

            <Icon
              size={24}
              className={color}
            />

          </div>

        </div>

      </CardContent>
    </Card>
  );
}