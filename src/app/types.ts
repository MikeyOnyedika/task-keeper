import { NextRequest, NextResponse } from "next/server";
import {
  displayOptions,
  projectTabs,
  status,
  priority,
  timeUnit,
} from "./constants";
import type { User as DBUser } from "./lib/db/mongooseModels/User";
import { ObjectId } from "mongoose";

export type User = DBUser & { _id: ObjectId };

export type Status = (typeof status)[keyof typeof status];

export type Priority = (typeof priority)[keyof typeof priority];

export type Project = {
  title: string;
  description: string;
  id: string;
  status: Status;
  deadline: string;
  startDate: string;
};

export type ProjectTab = (typeof projectTabs)[number];
export type ProjectTabTitle = (typeof projectTabs)[number]["title"];

export type TaskDisplayOption = (typeof displayOptions)[number];

export type TagScope = "user" | "project";

export type Tag = {
  id: string;
  title: string;
  scope: TagScope;
  color?: string;
};

export type Resource = {
  id: string;
  projectId: string;
  userId: string;
  title: string;
  // TODO: type this link property to be a type called URL. This URL type will be a type that uses regex to make sure you can only pass string values that satisfy the pattern of a valid web url
  link: string;
  description: string;
};

export type TaskList = {
  id: string;
  title: string;
  status: Status;
  taskItems: TaskItem[];
};

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  startDate: Date | null;
  deadline: Date | null;
  estimatedCompletionTime: string;
  tags: Tag[];
  taggedResources: Resource[];
};

export type SelectOption<T extends string = string> = {
  label: string;
  value: T;
};

export type TimeUnit = (typeof timeUnit)[keyof typeof timeUnit];

export type SignupBody = {
  username: string;
  password: string;
  email: string;
};

export type SigninBody = Omit<SignupBody, "username">

export type SignupBodyValidationSuccess = {
  operationStatus: "success";
  body: SignupBody;
};

export type SignupBodyValidationError = {
  operationStatus: "error";
  errors: ZodFieldError[];
};

export type SignupBodyValidationResult =
  | SignupBodyValidationSuccess
  | SignupBodyValidationError;

export type LoginBodyValidationResult =
  | {
    operationStatus: "success";
    body: Omit<SignupBody, "username">;
  }
  | {
    operationStatus: "error";
    errors: ZodFieldError[];
  };

export type OperationStatus = "success" | "error";

export type CheckUserAlreadyExistsResult =
  | {
    operationStatus: "success";
    userAlreadyExists: boolean;
  }
  | {
    operationStatus: "error";
    error: string;
  };

export type DBCreateUserResult =
  | {
    operationStatus: "success";
    user: Omit<User, "password">;
  }
  | {
    operationStatus: "error";
    error: string;
  };

export type DBFindOneUserByEmailResult =
  | {
    operationStatus: "success";
    user: (User & { _id: string }) | undefined;
  }
  | {
    operationStatus: "error";
    error: string;
  };

export type ZodFieldError = {
  message: string;
  field: string | number;
};

export type SignupRequestResult =
  | {
    operationStatus: "success";
    data: {
      user?: User;
      message?: string;
    };
  }
  | {
    operationStatus: "error";
    error?: string;
    errors?: ZodFieldError[];
  };

export type SigninRequestResult =
  | {
    operationStatus: "success";
  }
  | {
    operationStatus: "error";
    error?: string;
    errors?: ZodFieldError[];
  };

