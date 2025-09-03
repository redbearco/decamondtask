"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <Label htmlFor={id} className="text-gray-700 dark:text-gray-300">
            {label}
          </Label>
        )}
        <input
          id={id}
          ref={ref}
          className={cn(
            "w-full rounded-md border px-3 py-2 text-sm shadow-sm outline-none",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/40"
              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-end text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"
export { Input }