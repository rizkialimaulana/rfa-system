"use client";

import React, { FC } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  breadcrumbs?: {
    title: string;
    url: string;
  }[];
  create?: {
    title: string;
    onClick: any;
  };
  canBack?: boolean;
}

const HeaderIntro: FC<Props> = ({ title, breadcrumbs, create, canBack }) => {
  const route = useRouter();
  return (
    <Card className="mx-3 mt-4">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {canBack && (
              <ArrowLeft
                onClick={() => route.back()}
                className="cursor-pointer"
                size={20}
              />
            )}
            <CardTitle>{title}</CardTitle>
          </div>
          {create && (
            <Button variant="outline" onClick={create!.onClick}>
              {create.title}
            </Button>
          )}
        </div>
        <hr className="hr mb-4 mt-2"></hr>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs?.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={breadcrumb.url}>
                    {breadcrumb.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbs.length - 1 !== index && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </CardContent>
    </Card>
  );
};

export default HeaderIntro;
