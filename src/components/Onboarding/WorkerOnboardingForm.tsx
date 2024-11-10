"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { statelist } from "@/helpers/statelist";
import { useEffect } from "react";
import useApi from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import config from "@/helpers/config";

type FormData = {
  fullName: string;
  phone: string;
  pin: number;
  role: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  aadharCard: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
    cancelChequeUrl: string;
    panCard: string;
  };
  perSqFtPrice: string;
  totalSqFt: string;
};

export default function RegistrationForm() {
  const { toast } = useToast();
  const {
    data: workerData,
    error: workerError,
    loading: workerLoading,
    post: postWorker,
  } = useApi();
  const fourDigitRandomNumber = () => Math.floor(1000 + Math.random() * 9000);
  const form = useForm<FormData>({
    defaultValues: {
      fullName: "",
      phone: "",
      pin: fourDigitRandomNumber(),
      role: "",
      address: "",
      state: "",
      city: "",
      pincode: "",
      aadharCard: "",
      bankDetails: {
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
        cancelChequeUrl: "",
        panCard: "",
      },
      perSqFtPrice: "",
      totalSqFt: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const obj = {
      ...data,
      pin: fourDigitRandomNumber(),
    };
    postWorker(`${config.USER_API_URL}/register`, obj);
  };

  useEffect(() => {
    if (workerData) {
      console.log(workerData);
      toast({
        title: "Registration Successful",
        description: "You have been successfully registered",
      });
    }
    if (workerError) {
      console.log(workerError);
    }
    if (workerLoading) {
      console.log("loading");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workerData, workerError, workerLoading]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mx-auto"
      >
        <Card>
          <CardHeader className="border-b py-3 px-3 mb-2">
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill out all the fields below to register. Fields marked
              with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter a valid 10-digit phone number",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="worker">Worker</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aadharCard"
                rules={{
                  required: "Aadhar Card number is required",
                  pattern: {
                    value: /^\d{12}$/,
                    message: "Please enter a valid 12-digit Aadhar Card number",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Aadhar Card <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your Aadhar Card number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="state"
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      State <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="h-60 overflow-y-auto">
                        {statelist.map((state) => (
                          <SelectItem key={state.slno} value={state.state}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your city" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                rules={{
                  required: "Pincode is required",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Please enter a valid 6-digit pincode",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pincode <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your pincode" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b py-3 px-3 mb-2">
            <CardTitle>Bank Details</CardTitle>
            <CardDescription>
              Please fill out all the fields below to register. Fields marked
              with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bankDetails.bankName"
                rules={{ required: "Bank name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Bank Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your bank name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankDetails.accountNumber"
                rules={{
                  required: "Account number is required",
                  pattern: {
                    value: /^\d{9,18}$/,
                    message:
                      "Please enter a valid account number (9-18 digits)",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Account Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your account number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bankDetails.ifscCode"
                rules={{
                  required: "IFSC code is required",
                  pattern: {
                    value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                    message: "Please enter a valid IFSC code",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      IFSC Code <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your IFSC code" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bankDetails.accountHolderName"
                rules={{ required: "Account holder name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Account Holder Name{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter account holder name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bankDetails.panCard"
              rules={{
                required: "PAN Card number is required",
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: "Please enter a valid PAN Card number",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    PAN Card <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your PAN Card number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <CardFooter className="p-0 pb-5 flex justify-end">
          <Button type="submit" className="w-[300px]">
            Submit Registration
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
