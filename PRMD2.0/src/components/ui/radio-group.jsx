"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext(null)

function RadioGroup({ value, onValueChange, className, children, ...props }) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        data-slot="radio-group"
        className={cn("flex flex-wrap gap-3", className)}
        role="radiogroup"
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({ value: itemValue, id, className, ...props }) {
  const ctx = React.useContext(RadioGroupContext);
  const checked = ctx?.value === itemValue;

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
        checked
          ? "border-[#223e36] bg-[#223e36]/5 text-[#223e36]"
          : "border-slate-200 bg-white hover:bg-slate-50",
        className
      )}
    >
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={() => ctx?.onValueChange?.(itemValue)}
        className="h-4 w-4 accent-[#223e36]"
        {...props}
      />
      {props.children}
    </label>
  );
}

export { RadioGroup, RadioGroupItem }
