import type { ReactNode } from "react"

type ContentLayoutProps = {
  note: string
  title: string
  action?: ReactNode
}

export function ContentLayout({ note, title, action }: ContentLayoutProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {note}
        </p>
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      {action ? action : null}
    </div>
  )
}
