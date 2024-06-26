import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressBar = () => {
    const prec = (budget.totalSpend / budget.amount) * 100;
    return prec.toFixed(2);
  };
  return (
    <Link href={"/dashboard/expenses/" + budget.id}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex  gap-2 items-center">
            <h2 className=" bg-slate-100 items-center rounded-full p-3 text-2xl px-4 ">
              {budget.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget.name}</h2>
              <h2 className="text-xs text-gray-600">
                {budget.totalItem ? budget.totalItem : 0} items
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              ${budget.totalSpend ? budget.totalSpend : 0} Spent
            </h2>
            <h2 className="text-xs text-slate-400">
              {" "}
              ${budget.amount - budget.totalSpend} Remaining
            </h2>
          </div>
          <div className="w-full h-2 bg-slate-300 rounded-full">
            <div
              className="h-2 bg-primary rounded-full"
              style={{ width: `${calculateProgressBar()}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
