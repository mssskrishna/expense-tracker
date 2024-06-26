"use client";
import React, { useEffect, useId, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "../../../../../utils/dbConfig";
import { getTableColumns, sql, eq, desc, ilike } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { useRouter, useSearchParams } from "next/navigation";

function BudgetList() {
  const [budgetList, setBudgetLit] = useState([]);
  const { user } = useUser();
  const { router } = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    getBudgetList();
  }, [user, searchQuery]);
  /**
   * used to get Budget List
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(ilike(Budgets.name, `%${searchQuery}%`))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetLit(result);
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <CreateBudget
          refreshData={() => {
            getBudgetList();
          }}
        />
        {budgetList.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          : [1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="w-full height:120px bg-slate-300 animate-pulse rounded-md"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
