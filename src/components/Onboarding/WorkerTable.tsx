"use client"

import React, { useState, useEffect } from "react"
import useApi from "@/hooks/useApi"
import config from "@/helpers/config"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2, Pencil, CirclePlus } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function WorkerTable() {
  const router = useRouter()
  interface BankDetail {
    bankName: string
    accountNumber: string
    ifscCode: string
    accountHolderName: string
    cancelChequeUrl: string
    panCard: string
  }

  interface Worker {
    _id: string
    fullName: string
    phone: string
    role: string
    address: string
    city: string
    state: string
    pincode: string
    status: string
    perSqFtPrice?: number
    totalSqFt?: number
    bankDetails: BankDetail[]
  }

  const [workersData, setWorkersData] = useState<Worker[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [workerToDelete, setWorkerToDelete] = useState<string | null>(null)

  const {
    data: workers,
    error: workersError,
    loading: workersLoading,
    get: getWorkers,
  } = useApi()

  const {
    data : deleteWorkerData,
    error: deleteWorkerError,
    loading: deleteWorkerLoading,
    post: deleteWorker,
  } = useApi()

  useEffect(() => {
    getWorkers(`${config.USER_API_URL}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (workersError) {
      console.error("Error fetching workers", workersError)
    }
    if (workers && workers.data) {
      setWorkersData(workers.data)
    }
    if (workersLoading) {
      console.log("Loading workers")
    }
  }, [workers, workersError, workersLoading])

  const handleEdit = (id: string) => {
    router.push(`/dashboard/onboarding?edit=${id}`)
  }

  const handleDeleteClick = (id: string) => {
    setWorkerToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (workerToDelete) {
      const obj = {
        id : workerToDelete
      }
      try {
        deleteWorker(`${config.USER_API_URL}/${workerToDelete}/delete`, obj)
        setWorkersData((prevWorkers) =>
          prevWorkers.filter((worker) => worker._id !== workerToDelete)
        )
        setIsDeleteModalOpen(false)
        setWorkerToDelete(null)
      } catch (error) {
        console.error("Error deleting worker", error)
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl ">List of Workers</h1>
          <p className="text-sm text-gray-500">Add, edit, or delete.</p>
        </div>
        <Link href="/dashboard/onboarding">
          <Button className="mb-4">
            Add Worker
            <CirclePlus className="ml-2 h-4 w-4" />
          </Button>
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
              <TableCell>{worker.totalSqFt ? worker.totalSqFt : "N/A"}</TableCell>
              {worker.bankDetails.length > 0 ? (
                <>
                  <TableCell>{worker.bankDetails[0].bankName}</TableCell>
                  <TableCell>{worker.bankDetails[0].accountNumber}</TableCell>
                  <TableCell>{worker.bankDetails[0].ifscCode}</TableCell>
                  <TableCell>{worker.bankDetails[0].accountHolderName}</TableCell>
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
                  onClick={() => handleDeleteClick(worker._id)}
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

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this worker? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WorkerTable