/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"

function useApi() {
  const { toast } = useToast()
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCookies = (name: string) => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name))
      ?.split("=")[1];
    return cookie;
  };

  const setCookie = (name: string, value: string, options: any) => {
    let updatedCookie = `${name}=${value}`;
    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }
    document.cookie = updatedCookie;
  };

  const getHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    };
    const token = getCookies("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  const get = async (url: string) => {
    setLoading(true);
    try {
      const res = await axios.get(url, { 
        headers: getHeaders(),
        params: { _: new Date().getTime() } // Add timestamp to prevent caching
      });
      setData(res.data);
      setError(null);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const post = async (url: string, body: any) => {
    setLoading(true);
    try {
      const res = await axios.post(url, body, { headers: getHeaders() });
      setData(res.data);
      if (res.data.access_token) {
        setCookie("token", res.data.access_token, {
          "max-age": res.data.expiry,
        });
        setCookie("refresh_token", res.data.refresh_token, {
          "max-age": res.data.expiry,
        });
      }
      setError(null);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = async (err: any) => {
    setData(null);
    if (err.response) {
      if (err.response) {
        toast({
          title: "Session Expired",
          description: "Please login again",
          variant: "destructive",
        })
        window.location.href = "/logout";
      }
      setError(err.response.data);
    } else if (err.request) {
      setError("No response received");
    } else {
      setError(err.message);
    }
  };
  
  return { data, error, get, post, loading };
}

export default useApi;