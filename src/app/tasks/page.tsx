"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import path from "path"
import { Metadata } from "next"
import { useEffect, useState } from "react";
import Image from "next/image"
import { z } from "zod"

import {columns} from "@/components/ui/tasks/components/columns"
import { DataTable } from "@/components/ui/tasks/components/data-table"
import { UserNav } from "@/components/ui/tasks/components/user-nav"
import { taskSchema } from "@/components/ui/tasks/data/schema"
import { AnimatedBeamTransition } from "@/components/ui/AnimatedBeamTransition";




export default function TaskPage() {
  const [tasks, setTasks] = useState([
    {
      id: "",
      label: "",
      title: "",
      status: "",
      priority: "",
    }
  ]);

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          console.error("Email not found in localStorage");
          return;
        }
  
        const placeIdResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-place-id-by-email/${email}/`
        );
  
        const placeIdsAsArray = placeIdResponse.data.places.map(
          (place: any) => place.place_id
        );
        const placeIdsQuery = placeIdsAsArray.join(",");
        console.log("idsss", placeIdsQuery);
  
        const tasks = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-linear-task-by-place-id/${placeIdsQuery}/`
        );
  
        console.log("internal ", tasks.data);
        setTasks(tasks.data);
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        console.error(err);
      }
    };
    setIsLoading(true)
    fetchData();
  }, []);

  return (
    <>
    {isLoading && (
      <AnimatedBeamTransition/>
    )}
    {!isLoading && (
      <>
      <div className="md:hidden">
      <Image
        src="/examples/tasks-light.png"
        width={1280}
        height={998}
        alt="Playground"
        className="block dark:hidden"
      />
      <Image
        src="/examples/tasks-dark.png"
        width={1280}
        height={998}
        alt="Playground"
        className="hidden dark:block"
      />
    </div>
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            {"Here's a list of your tasks for this month!"}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </div>
    </>
    )}

    </>
  )
}
