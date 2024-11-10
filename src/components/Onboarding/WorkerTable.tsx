"use client";
import React, { useState, useEffect } from "react";
import useApi from "@/hooks/useApi";
import config from "@/helpers/config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { Trash2, Pencil,CirclePlus } from "lucide-react";

function WorkerTable() {
  interface BankDetail {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    cancelChequeUrl: string;
    panCard: string;
  }

  interface Worker {
    _id: string;
    fullName: string;
    phone: string;
    role: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    status: string;
    perSqFtPrice?: number;
    totalSqFt?: number;
    bankDetails: BankDetail[];
  }

  const [workersData, setWorkersData] = useState<Worker[]>([]);
  const {
    data: workers,
    error: workersError,
    loading: workersLoading,
    get: getWorkers,
  } = useApi();

  useEffect(() => {
    getWorkers(`${config.USER_API_URL}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (workersError) {
      console.error("Error fetching workers", workersError);
    }
    if (workers && workers.data) {
      setWorkersData(workers.data);
    }
    if (workersLoading) {
      console.log("Loading workers");
    }
  }, [workers, workersError, workersLoading]);

  const handleEdit = (id: string) => {
    // Handle edit logic here
    console.log(`Edit worker with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Handle delete logic here
    console.log(`Delete worker with id: ${id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl ">List of Workers</h1>
          <p className="text-sm text-gray-500">Add, edit, or delete.</p>
        </div>
        <Link href="/dashboard/onboarding">
          <Button className="mb-4">Add Worker<CirclePlus /> </Button>
        </Link>
      </div>
      <Table>
        <TableCaption>A list of workers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Per SqFt Price</TableHead>
            <TableHead>Total SqFt</TableHead>
            <TableHead>Bank Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead>IFSC Code</TableHead>
            <TableHead>Account Holder Name</TableHead>
            <TableHead>PAN Card</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workersData.map((worker) => (
            <TableRow key={worker._id}>
              <TableCell className="font-medium">{worker.fullName}</TableCell>
              <TableCell>{worker.phone}</TableCell>
              <TableCell>{worker.role}</TableCell>
              <TableCell>
                {worker.perSqFtPrice ? `₹${worker.perSqFtPrice}` : "N/A"}
              </TableCell>
              <TableCell>
                {worker.totalSqFt ? worker.totalSqFt : "N/A"}
              </TableCell>
              {worker.bankDetails.length > 0 ? (
                <>
                  <TableCell>{worker.bankDetails[0].bankName}</TableCell>
                  <TableCell>{worker.bankDetails[0].accountNumber}</TableCell>
                  <TableCell>{worker.bankDetails[0].ifscCode}</TableCell>
                  <TableCell>
                    {worker.bankDetails[0].accountHolderName}
                  </TableCell>
                  <TableCell>{worker.bankDetails[0].panCard}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                </>
              )}
              <TableCell className="flex">
                <Pencil
                  className="cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(worker._id)}
                  height={15}
                />
                <Trash2
                  className="cursor-pointer text-red-500 ml-2 hover:text-red-700"
                  onClick={() => handleDelete(worker._id)}
                  height={15}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={12}>Total Workers</TableCell>
            <TableCell className="text-right">{workersData.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export default WorkerTable;