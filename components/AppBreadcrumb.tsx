"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function AppBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList className="rounded-lg border bg-muted/40 px-3 py-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator className="mx-2" />}

            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage className="font-medium text-foreground">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  asChild
                  className="transition-colors hover:text-primary"
                >
                  <Link href={item.href!}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
