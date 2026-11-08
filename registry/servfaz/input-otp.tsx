"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

/*
 * InputOTP - base do Input OTP do shadcn com os tokens Semantic do Servi DS.
 * Campo de código de verificação, uma casa por dígito, com a caixa do Input
 * (40px) e foco em brand.
 */

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("flex items-center", className)} {...props} />
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-10 items-center justify-center border-y border-r border-(--color-border-default) bg-(--color-background-default) shadow-xs outline-none",
        "typo-sans-md-medium text-(--color-foreground-emphasis)",
        "transition-[border-color,box-shadow] duration-150",
        "first:rounded-l-(--radius-lg) first:border-l last:rounded-r-(--radius-lg)",
        "data-[active=true]:z-10 data-[active=true]:border-(--color-brand-border-focus) data-[active=true]:shadow-[0_0_0_3px_var(--color-brand-light-pressed)]",
        "aria-invalid:border-(--color-feedback-danger-outline)",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-pulse bg-(--color-foreground-emphasis)" />
        </div>
      ) : null}
    </div>
  )
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" className="text-(--color-foreground-muted)" {...props}>
      <MinusIcon className="size-4" />
    </div>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
