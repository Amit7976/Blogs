"use client"
import { useEffect } from "react";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function useExtractBlogId({
  setHashValue,
  setBlogId,
  setDataLoading,
}: {
  setHashValue: (value: string) => void;
  setBlogId: (value: string) => void;
  setDataLoading: (value: boolean) => void;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const blogIdFromHash = window.location.hash?.substring(1);
      if (blogIdFromHash) {
        setHashValue(blogIdFromHash);
        setBlogId(blogIdFromHash);
      } else {
        setDataLoading(false);
      }
    }
  }, []);
}
