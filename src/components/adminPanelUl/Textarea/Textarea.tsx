import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from '@/components/ui/textarea';
import { IoCode, IoImageOutline, IoLinkSharp } from 'react-icons/io5';
import { LuRedo, LuUndo } from 'react-icons/lu';
import { FaListOl, FaListUl } from 'react-icons/fa6';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"



interface TextareaWithHTMLConversionProps {
    onChangeHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    data: {
        description: string;
    };
}

const TextareaWithHTMLConversion: React.FC<TextareaWithHTMLConversionProps> = ({ onChangeHandler, data }) => {

    const buttons = [
        {
            content: "<b>B</b>",
            tooltip: "Use for <b>Bold</b> Content",
            startTag: "<b>",
            endTag: "</b>",
        },
        {
            content: "<i>I</i>",
            tooltip: "Use for <i>Italic</i> Content",
            startTag: "<i>",
            endTag: "</i>",
        },
        {
            content: "<u>U</u>",
            tooltip: "Use for <u>Underline</u> Content",
            startTag: "<u>",
            endTag: "</u>",
        },
        {
            content: "<del>Del</del>",
            tooltip: "Use for represent <del>removal</del> Content",
            startTag: "<del>",
            endTag: "</del>",
        },
        {
            content: "",
            icon: <IoImageOutline />,
            tooltip: "Insert a Image",
            startTag: "",
            endTag: "",
            image: true,
        },
        {
            content: "",
            icon: <IoLinkSharp />,
            tooltip: "Insert <u className='cursor-pointer'>Link</u>",
            startTag: "<a href='/' class=text-orange-500 decoration-2 hover:underline focus:outline-none focus:underline font-medium'>\n",
            endTag: "\n</a>",
        },
        {
            content: "",
            icon: <FaListUl />,
            tooltip: "Insert <u className='cursor-pointer'>Link</u>",
            startTag: "<li class='ps-2 list-disc'>",
            endTag: "</li>\n",
        },
        {
            content: "",
            icon: <FaListOl />,
            tooltip: "Insert <u className='cursor-pointer'>Link</u>",
            startTag: "<li class='ps-2 list-decimal'>",
            endTag: "</li>\n",
        },
        {
            content: "",
            icon: <IoCode />,
            tooltip: "Insert <u className='cursor-pointer'>Link</u>",
            startTag: "&lt;",
            endTag: "&gt;",
        },
        {
            content: "<p className='text-lg'>P</p>",
            tooltip: "amit",
            startTag: "<p class='text-lg text-gray-800 dark:text-neutral-200'>\n",
            endTag: "\n</p",
        },
        {
            content: "<h1 className='text-2xl font-semibold'>H1</h1>",
            tooltip: "amit",
            startTag: "<h1 class='text-4xl font-semibold'>\n",
            endTag: "\n</h1>",
        },
        {
            content: "<h2 className='text-xl font-semibold'>H2</h2>",
            tooltip: "amit",
            startTag: "<h2 class='text-2xl font-bold md:text-3xl dark:text-white'>\n",
            endTag: "\n</h2>",
        },
        {
            content: "<h3 className='text-lg font-semibold'>H3</h3>",
            tooltip: "amit",
            startTag: "<h3 class='text-2xl font-semibold dark:text-white'>\n",
            endTag: "\n</h3>",
        },
        {
            content: "<h4 className='text-sm font-semibold'>H4</h4>",
            tooltip: "amit",
            startTag: "<h4 class='text-xl font-semibold'>\n",
            endTag: "\n</h4>",
        },
        {
            content: "<h5 className='text-xs font-semibold'>H5</h5>",
            tooltip: "amit",
            startTag: "<h5 class='text-lg font-semibold'>\n",
            endTag: "\n</h5>",
        },
        {
            content: "Code",
            tooltip: "amit",
            startTag: "<code class='font-mono'>",
            endTag: "</code>",
        },
        {
            content: "Div",
            tooltip: "amit",
            startTag: "<div class='space-y-4 my-10'>\n",
            endTag: "\n</div>",
        },
        {
            content: "Quote",
            tooltip: "amit",
            startTag: "<blockquote class='text-center p-4 sm:px-7'>\n<p class='text-xl font-medium text-gray-800 md:text-2xl md:leading-normal xl:text-2xl xl:leading-normal dark:text-neutral-200'>\n",
            endTag: "\n</p>\n</blockquote>",
        },
    ];



    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const [description, setDescription] = useState(data.description || '');
    const [contentEditable, setContentEditable] = useState(data.description);
    const [undoStack, setUndoStack] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [altText, setAltText] = useState('');

    const handleTagConversion = (startTag: string, endTag: string, isUl?: boolean, isUl2?: boolean) => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = textarea.value.substring(start, end);

            if (selectedText) {
                let newText = textarea.value;

                if (isUl || isUl2) {
                    const lines = selectedText.split('\n');
                    const listItems = lines.map(line => {
                        const modifiedLine = line.replace(/^(.*?)\s*:/, '<b>$1</b>:');
                        return `<li class="ps-2">${modifiedLine}</li>`;
                    }).join('\n');

                    const ulClass = isUl ? 'list-disc' : 'list-decimal';
                    newText = `${textarea.value.slice(0, start)}<ul class="${ulClass} list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">\n${listItems}\n</ul>${textarea.value.slice(end)}`;
                } else {
                    newText = `${textarea.value.slice(0, start)}${startTag}${selectedText}${endTag}${textarea.value.slice(end)}`;
                }

                setUndoStack(prev => [...prev, textarea.value]);
                setRedoStack([]);

                setDescription(newText);
                setContentEditable(newText);

                handleInputChange({
                    target: {
                        name: 'description',
                        value: newText
                    }
                } as React.ChangeEvent<HTMLTextAreaElement>);

                setTimeout(() => {
                    textarea.selectionStart = start + startTag.length;
                    textarea.selectionEnd = start + startTag.length + selectedText.length;
                    textarea.focus();
                }, 0);
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        setContentEditable(e.target.value);
        onChangeHandler(e);
    };

    const undo = () => {
        setUndoStack(prev => {
            const previous = prev.slice(0, -1);
            const last = prev[prev.length - 1];
            if (last !== undefined) {
                setRedoStack(old => [...old, description]);
                setDescription(last);
                setContentEditable(last);
                onChangeHandler({ target: { value: last } } as React.ChangeEvent<HTMLTextAreaElement>);
            }
            return previous;
        });
    };

    const redo = () => {
        setRedoStack(prev => {
            const next = prev.slice(0, -1);
            const last = prev[prev.length - 1];
            if (last !== undefined) {
                setUndoStack(old => [...old, description]);
                setDescription(last);
                setContentEditable(last);
                onChangeHandler({ target: { value: last } } as React.ChangeEvent<HTMLTextAreaElement>);
            }
            return next;
        });
    };

    useEffect(() => {
        if (contentEditableRef.current) {
            contentEditableRef.current.innerHTML = contentEditable;
        }
    }, [contentEditable]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'z') {
                e.preventDefault();
                undo();
            }
            if (e.ctrlKey && e.key === 'y') {
                e.preventDefault();
                redo();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [description, undoStack, redoStack]);

    const handleImageInsert = () => {
        if (textareaRef.current) {
            const textarea = textareaRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const imgTag = `<figure>\n<img \n src="${imageUrl}" \n alt="${altText}" \n class="w-full h-auto aspect-video object-cover rounded-xl mt-10 mb-5" />\n<figcaption class="mt-3 text-sm text-center text-gray-500 dark:text-neutral-500">\nENTER_IMAGE_SOURCE\n</figcaption>\n</figure>`;
            const newText = `${textarea.value.slice(0, start)}${imgTag}${textarea.value.slice(end)}`;

            setUndoStack(prev => [...prev, textarea.value]);
            setRedoStack([]);

            setDescription(newText);
            setContentEditable(newText);

            handleInputChange({
                target: {
                    name: 'description',
                    value: newText
                }
            } as React.ChangeEvent<HTMLTextAreaElement>);

            setTimeout(() => {
                textarea.selectionStart = start + imgTag.length;
                textarea.selectionEnd = start + imgTag.length;
                textarea.focus();
            }, 0);

            setImageDialogOpen(false); // Close the dialog after inserting the image

            setAltText('');
            setImageUrl('');
        }
    };

    return (
        <>
            <Tabs defaultValue="html" className="w-full">
                <TabsList className='space-x-4'>
                    <TabsTrigger className='min-w-40 h-12 font-medium rounded-lg border-2' value="html">HTML Code</TabsTrigger>
                    <TabsTrigger className='min-w-40 h-12 font-medium rounded-lg border-2' value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="html">
                    <div className='flex flex-col gap-2 py-5 px-2'>
                        <div className='flex flex-wrap gap-2'>
                            {/* Tag buttons */}
                            {buttons.map((button, index) => (
                                <TooltipProvider key={index}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div
                                                className='cursor-pointer px-6 py-1 h-12 flex items-center justify-center bg-gray-600 text-white text-base rounded-lg w-fit select-none active:bg-gray-500 active:scale-95 duration-200'
                                                onClick={(event) => {
                                                    event.preventDefault(); // Prevent the default behavior
                                                    event.stopPropagation(); // Prevent event bubbling to other handlers
                                                    if (button.image) {
                                                        setImageDialogOpen(true);
                                                    } else {
                                                        handleTagConversion(button.startTag, button.endTag);
                                                    }
                                                }}
                                            >
                                                {button.content === '' ? button.icon : (<div dangerouslySetInnerHTML={{ __html: button.content }} />)}
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className='text-base px-5 py-2'>
                                                <div dangerouslySetInnerHTML={{ __html: button.tooltip }} />
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className='cursor-pointer px-6 py-1 h-12 flex items-center justify-center bg-gray-600 text-white text-base rounded-lg w-fit select-none active:bg-gray-500 active:scale-95 duration-200'
                                            onClick={(event) => {
                                                event.preventDefault(); // Prevent the default behavior
                                                event.stopPropagation(); // Prevent event bubbling to other handlers
                                                handleTagConversion('<ul class="list-disc list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">\n', '\n</ul>', true, false);
                                            }}>
                                            <span className="border p-1 block rounded-sm"><FaListUl /></span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='text-base px-5 py-2'>amit</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className='cursor-pointer px-6 py-1 h-12 flex items-center justify-center bg-gray-600 text-white text-base rounded-lg w-fit select-none active:bg-gray-500 active:scale-95 duration-200'
                                            onClick={(event) => {
                                                event.preventDefault(); // Prevent the default behavior
                                                event.stopPropagation(); // Prevent event bubbling to other handlers
                                                handleTagConversion('<ul class="list-decimal list-outside space-y-5 ps-5 text-lg text-gray-800 dark:text-neutral-200">\n', '\n</ul>', false, true);
                                            }}>
                                            <span className="border p-1 block rounded-sm"><FaListOl /></span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='text-base px-5 py-2'>amit</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className='cursor-pointer px-6 py-1 h-12 flex items-center justify-center bg-gray-600 text-white text-base rounded-lg w-fit select-none active:bg-gray-500 active:scale-95 duration-200'
                                            onClick={(event) => {
                                                event.preventDefault(); // Prevent the default behavior
                                                event.stopPropagation(); // Prevent event bubbling to other handlers
                                                undo()
                                            }}>
                                            <LuUndo />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='text-base px-5 py-2'>amit</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className='cursor-pointer px-6 py-1 h-12 flex items-center justify-center bg-gray-600 text-white text-base rounded-lg w-fit select-none active:bg-gray-500 active:scale-95 duration-200'
                                            onClick={(event) => {
                                                event.preventDefault(); // Prevent the default behavior
                                                event.stopPropagation(); // Prevent event bubbling to other handlers
                                                redo()
                                            }}>
                                            <LuRedo />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className='text-base px-5 py-2'>amit</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {/* End Tag buttons */}
                        </div>
                    </div>

                    <Textarea
                        id="textarea"
                        name="description"
                        onChange={handleInputChange}
                        value={description}
                        ref={textareaRef}
                        className="p-10 h-[calc(100vh-143px)] border-gray-200 shadow-sm rounded-xl text-base border-0 outline-none font-medium tracking-wider text-black bg-gray-300 focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 focus-visible:ring-0 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 resize-none overflow-x-auto whitespace-nowrap"
                        placeholder="A detailed summary will better explain your blog to the audiences. Our users will see this in your dedicated product page."
                    />
                </TabsContent>
                <TabsContent value="preview">
                    <div className="p-10 h-[calc(100vh-143px)] border-gray-200 shadow-sm rounded-xl border-2 overflow-y-scroll" dangerouslySetInnerHTML={{ __html: description }} />
                </TabsContent>
            </Tabs>

            <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
                <DialogTrigger asChild>
                    <button className="hidden">Open</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image</DialogTitle>
                        <DialogDescription>
                            Upload an image and provide an alt text for it.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col space-y-4">
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="border p-2 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Alt Text"
                            value={altText}
                            onChange={(e) => setAltText(e.target.value)}
                            className="border p-2 rounded-lg"
                        />
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg"
                            onClick={handleImageInsert}
                        >
                            Insert Image
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TextareaWithHTMLConversion;
