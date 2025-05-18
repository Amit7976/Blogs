"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

interface RichTextEditorProps {
    content: string;
    onChange?: (content: string) => void;
    editable?: boolean;
}
export default function RichTextEditor({
    content,
    onChange,
    editable,
}: RichTextEditorProps) {
    const isEditable = editable ?? true;

    const editor = useEditor({
        editable: isEditable,
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: isEditable
                    ? "h-dvh w-full border-0 rounded-b-md bg-white dark:bg-neutral-800 py-14 px-5 text-xl outline-none"
                    : "",
            },
        },
        onUpdate: ({ editor }) => {
            // console.log(editor.getHTML());
            if (onChange) onChange(editor.getHTML());
        },
    });

    return (
        <div className="relative">
            {isEditable && <MenuBar editor={editor} />}
            <EditorContent editor={editor}/>
        </div>
    );
}