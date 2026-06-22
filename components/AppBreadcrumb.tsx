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
    <Breadcrumb className="mt-1">
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}

            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                // <BreadcrumbLink href={item.href!}>{item.label}</BreadcrumbLink>
                <BreadcrumbLink asChild>
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
