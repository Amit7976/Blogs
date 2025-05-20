import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type Blog = {
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  tags: string;
  status: string;
  imageTitle: string;
  image: string | null;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function useAutoSaveDraft({
  data,
  content,
  image,
  hashValue,
  setHashValue,
  blogId,
  setBlogId,
}: {
  data: Blog;
  content: string | null;
  image: File | null;
  hashValue: string;
  setHashValue: (value: string) => void;
  blogId: string;
  setBlogId: (value: string) => void;
}) {
  const [hasCreatedDraft, setHasCreatedDraft] = useState(false);
  const dataRef = useRef(data);
  const contentRef = useRef(content);
  const imageRef = useRef(image);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    dataRef.current = data;
    contentRef.current = content;
    imageRef.current = image;
  }, [data, content, image]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const router = useRouter();

  //  Create Draft
  const createDraft = useCallback(async () => {
    const formData = new FormData();
    formData.append("title", dataRef.current.title);
    formData.append("shortDescription", dataRef.current.shortDescription);
    formData.append("description", contentRef.current || "");
    formData.append("category", dataRef.current.category);
    formData.append("tags", dataRef.current.tags);
    formData.append("status", "draft");
    formData.append("imageTitle", dataRef.current.imageTitle);
    if (imageRef.current) formData.append("image", imageRef.current);

    try {
      const res = await axios.post("/api/blogs/blogs", formData);
      if (res.data.success && res.data.blogId) {
        setHasCreatedDraft(true);
        setBlogId(res.data.blogId);
        setHashValue(res.data.blogId); // Important
        const draftDataForLocalStorage = {
          blogId,
          ...dataRef.current,
          description: contentRef.current,
          imageName: imageRef.current?.name || null,
        };
        localStorage.setItem(
          res.data.blogId,
          JSON.stringify(draftDataForLocalStorage)
        );
        router.replace(`#${res.data.blogId}`);
        toast.success("Draft created.");
      } else {
        toast.error("Failed to create draft.");
      }
    } catch (err) {
      console.error("Create draft error:", err);
      toast.error("Create draft error");
    }
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Auto-save
  const autoSaveDraft = useCallback(async () => {
    if (
      !dataRef.current.title &&
      !dataRef.current.shortDescription &&
      !contentRef.current &&
      !dataRef.current.tags &&
      !imageRef.current &&
      !dataRef.current.imageTitle
    )
      return;

    if (!hasCreatedDraft) {
      await createDraft();
      return;
    }

    const draftDataForLocalStorage = {
      blogId,
      ...dataRef.current,
      description: contentRef.current,
      imageName: imageRef.current?.name || null,
    };

    if (hashValue) {
      localStorage.setItem(hashValue, JSON.stringify(draftDataForLocalStorage));
    }

    const formData = new FormData();
    formData.append("blogId", blogId);
    formData.append("title", dataRef.current.title);
    formData.append("shortDescription", dataRef.current.shortDescription);
    formData.append("description", contentRef.current || "");
    formData.append("category", dataRef.current.category);
    formData.append("tags", dataRef.current.tags);
    formData.append("status", dataRef.current.status);
    formData.append("imageTitle", dataRef.current.imageTitle);
    if (imageRef.current) formData.append("image", imageRef.current);

    try {
      const res = await axios.put("/api/blogs/blogs", formData);
      if (res.data.success) toast.success("Draft auto-saved.");
      else toast.error("Auto-save failed.");
    } catch (err) {
      console.error("Auto-save error:", err);
      toast.error("Auto-save error");
    }
  }, [hasCreatedDraft, blogId, createDraft, hashValue]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // First interaction trigger
  useEffect(() => {
    if (hasCreatedDraft) return;

    if (typeof window !== "undefined") {
      const blogIdFromHash = window.location.hash?.substring(1);

      if (blogIdFromHash) {
        const existingDraft = localStorage.getItem(blogIdFromHash);

        if (existingDraft) {
          // ✅ Draft exists in localStorage, just set and return
          setBlogId(blogIdFromHash);
          setHashValue(blogIdFromHash);
          setHasCreatedDraft(true);
          return;
        } else {
          // 🟡 Hash exists but data missing from localStorage ⇒ Draft expired or cleared
          console.warn("Draft not found in localStorage, creating new draft.");
          // No return → will fall through to attach keydown listener
        }
      }
    }

    const handleFirstKey = () => {
      if (!hasCreatedDraft) {
        createDraft();
      }
      window.removeEventListener("keydown", handleFirstKey);
    };

    window.addEventListener("keydown", handleFirstKey);
    return () => window.removeEventListener("keydown", handleFirstKey);
  }, [hasCreatedDraft, createDraft]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Auto-save every 10s
  useEffect(() => {
    if (!hasCreatedDraft) return;

    const interval = setInterval(() => {
      autoSaveDraft();
    }, 30000);

    return () => clearInterval(interval);
  }, [hasCreatedDraft, autoSaveDraft]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      autoSaveDraft();

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [data]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Debounced save on user activity
  const debouncedSave = useCallback(
    debounce(() => {
      autoSaveDraft();
    }, 5000),
    [autoSaveDraft]
  );

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    debouncedSave();
    return () => debouncedSave.cancel();
  }, [data, content, image]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return { autoSaveDraft, createDraft };
}
