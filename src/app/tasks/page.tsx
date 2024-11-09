"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import path from "path";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import { z } from "zod";

import { columns } from "@/components/ui/tasks/components/columns";
import { DataTable } from "@/components/ui/tasks/components/data-table";
import { UserNav } from "@/components/ui/tasks/components/user-nav";
import { taskSchema } from "@/components/ui/tasks/data/schema";
import { AnimatedBeamTransition } from "@/components/ui/AnimatedBeamTransition";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function TaskPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState([
    {
      id: "",
      label: "",
      title: "",
      status: "",
      priority: "",
    },
  ]);

  const [newTaskOpen, setIsNewTaskOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [dataToRender, setDataToRender] = useState<any>();
  const [placeId, setPlaceId] = useState("");


  const sendEmailToCustomer = (bug: any) =>
  {
    console.log(bug)
    axios
    .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/send-email-to-customer-resolved/`, {
      task: bug
    })
    .then((response) => {})
    .catch((error) => {});
  }

  const handleStatusUpdate = (bug: any, newStatus: string) => {
    console.log(newStatus)
    // Directly modifying the status of the rowData
    if (newStatus == "resolved" && bug.name != "")
      {
        toast({
          title: `Let ${bug.name} know issue is resolved?`,
          duration: 10000,
          action: (
            <ToastAction altText="Goto schedule to undo" onClick={() => sendEmailToCustomer(bug)}>Email</ToastAction>
          ),
        });
      }
    const updatedTask = { ...bug, status: newStatus }; // This will modify the status field of the passed bug

    // Assuming data is an array of bugs, update the correct bug
    const updatedData = tasks.map((item) =>
      item.id === bug.id ? updatedTask : item
    );

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/update-task/${placeId}/`,
        {
          updatedTask: updatedTask,
          placeId: placeId,
        }
      )
      .then((response) => {})
      .catch((error) => {});
    // Now update the state with the new data

    setTasks(updatedData);


  };

  const handleDescriptionUpdate = (bug: any, newDescription: string) => {
    // Directly modifying the description of the rowData
    const updatedTask = { ...bug, description: newDescription }; // This will modify the description field of the passed bug

    // Assuming data is an array of bugs, update the correct bug
    const updatedData = tasks.map((item) =>
      item.id === bug.id ? updatedTask : item
    );

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/update-description/${placeId}/`,
        {
          updatedTask: updatedTask,
          placeId: placeId,
        }
      )
      .then((response) => {})
      .catch((error) => {});
    // Now update the state with the new data
    setTasks(updatedData);
  };

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

        const tasks = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/backend/get-linear-task-by-place-id/${placeIdsQuery}/`
        );

        const reversedTasks = [...tasks.data.tasks].reverse();
        console.log(tasks.data.tasks);
        setDataToRender(reversedTasks);
        setTasks(reversedTasks);
        setPlaceId(tasks.data.place_id);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    };
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <div className="md:hidden"></div>
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div className="container mx-auto p-4">
                <GradualSpacing
                  className="text-2xl font-bold mb-4 text-center"
                  text="Vero Tasks"
                />
              </div>
              {/* <Button variant="outline" size="sm" className="h-8 border-dashed" onClick={() => setIsNewTaskOpen(true)}>
          <PlusCircle />
          {"New Task"}
        </Button> */}
            </div>
            
            <DataTable
              data={tasks}
              columns={columns}
              onStatusUpdate={handleStatusUpdate}
              onDescriptionUpdate={handleDescriptionUpdate}
              isNewTaskOpen={newTaskOpen}
            />

          </div>
        </>
      )}
    </>
  );
}
