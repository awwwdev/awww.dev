import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import YouTube from "@/components/YouTube";
import NextImage from "next/image";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "@/components/ui/modal";
import Icon from '@/components/ui/Icon';

interface EditorProps {
  content: string;
  onContentChange: (content: any) => void;
  onEditorReady: (editor: any) => void;
  direction: "rtl" | "ltr";
}

const Editor: React.FC<EditorProps> = ({ content, onContentChange, onEditorReady, direction }) => {
  const supabase = useSupabaseClient();

  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [url, setUrl] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [altText, setAltText] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const extensions = [
    Highlight,
    Dropcursor,
    Link,
    Image,
    YouTube,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  const editor = useEditor({
    extensions: extensions,
    content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor) {
      onEditorReady(editor);
    }
  }, [editor, onEditorReady]);

  useEffect(() => {
    if (isImageModalOpen) {
      const fetchImages = async () => {
        const { data, error } = await supabase.storage.from("blog").list("photo/");
        if (data) {
          setImages(
            data
              .slice(1)
              .map(
                (entry) => `https://vancxkbrtcdpbjavbdbx.supabase.co/storage/v1/object/public/blog/photo/${entry.name}`
              )
          );
        } else {
          console.error("Fetch images error: ", error);
        }
      };
      fetchImages();
    }
  }, [isImageModalOpen, supabase.storage]);

  function getButtonClass(format: string) {
    return `${editor?.isActive(format) ? "text-accent-10" : ""}`;
  }

  function getIconClass(format: string, activeClass: string, inactiveClass: string) {
    return `${editor?.isActive(format) ? activeClass : inactiveClass}`;
  }

  return (
    <div style={{ direction: direction }}>
      <div className="flex flex-wrap gap-6 bg-white rounded border border-gray-300 px-4 py-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          className={getButtonClass("bold")}
        >
          <Icon name={getIconClass("bold", "bf-i-ph-text-b-bold", "bf-i-ph-text-b")} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          className={getButtonClass("italic")}
        >
          <Icon name={getIconClass("italic", "bf-i-ph-text-italic-bold", "bf-i-ph-text-italic")}></Icon>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          className={getButtonClass("strike")}
        >
          <Icon
            className={getIconClass("strike", "bf-i-ph-text-strikethrough-bold", "bf-i-ph-text-strikethrough")}
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHighlight().run();
          }}
          className={getButtonClass("highlight")}
        >
          <Icon
            name={getIconClass("highlight", "bf-i-ph-highlighter-circle-bold", "bf-i-ph-highlighter-circle")}
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          disabled={!editor?.can().chain().focus().toggleCode().run()}
          className={getButtonClass("code")}
        >
          <Icon name={getIconClass("code", "bf-i-ph-code-bold", "bf-i-ph-code")} />
        </button>
        <p className="text-gray-300">|</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setParagraph().run();
          }}
          className={getButtonClass("paragraph")}
        >
          <Icon name={getIconClass("paragraph", "bf-i-ph-paragraph-bold", "bf-i-ph-paragraph")} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`${editor?.isActive("heading", { level: 1 }) ? "text-accent-10" : ""}`}
        >
          <Icon
            name={`${
              editor?.isActive("heading", { level: 1 }) ? "bf-i-ph-text-h-one-bold" : "bf-i-ph-text-h-one"
            }`}
           />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`${editor?.isActive("heading", { level: 2 }) ? "text-accent-10" : ""}`}
        >
          <Icon
            name={`${
              editor?.isActive("heading", { level: 2 }) ? "bf-i-ph-text-h-two-bold" : "bf-i-ph-text-h-two"
            }`}
           />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={`${editor?.isActive("heading", { level: 3 }) ? "text-accent-10" : ""}`}
        >
          <Icon
            name={`${
              editor?.isActive("heading", { level: 3 }) ? "bf-i-ph-text-h-three-bold" : "bf-i-ph-text-h-three"
            }`}
           />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={`${editor?.isActive("heading", { level: 4 }) ? "text-accent-10" : ""}`}
        >
          <Icon
            name={`${
              editor?.isActive("heading", { level: 4 }) ? "bf-i-ph-text-h-four-bold" : "bf-i-ph-text-h-four"
            }`}
           />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
          className={`${editor?.isActive("heading", { level: 5 }) ? "text-accent-10" : ""}`}
        >
          <Icon
            name={`${
              editor?.isActive("heading", { level: 5 }) ? "bf-i-ph-text-h-five-bold" : "bf-i-ph-text-h-five"
            }`}
           />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }}
          className={`${editor?.isActive("heading", { level: 6 }) ? "text-accent-10" : ""}`}
        >
          <Icon
            name={`${
              editor?.isActive("heading", { level: 6 }) ? "bf-i-ph-text-h-six-bold" : "bf-i-ph-text-h-six"
            }`}
          />
        </button>
        <p className="text-gray-300">|</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={getButtonClass("bulletList")}
        >
          <span className={getIconClass("bulletList", "bf-i-ph-list-bullets-bold", "bf-i-ph-list-bullets")}></span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={getButtonClass("orderedList")}
        >
          <span className={getIconClass("orderedList", "bf-i-ph-list-numbers-bold", "bf-i-ph-list-numbers")}></span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
          }}
          className={getButtonClass("codeBlock")}
        >
          <span className={getIconClass("codeBlock", "bf-i-ph-code-block-bold", "bf-i-ph-code-block")}></span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={getButtonClass("blockquote")}
        >
          <span className={getIconClass("blockQuote", "bf-i-ph-quotes-bold", "bf-i-ph-quotes")}></span>
        </button>
        <p className="text-gray-300">|</p>
        {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>horizontal rule</button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</button> */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor?.can().chain().focus().undo().run()}
        >
          <Icon name="bf-i-ph-arrow-counter-clockwise"/>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor?.can().chain().focus().redo().run()}
        >
          <Icon name="bf-i-ph-arrow-clockwise"/>
        </button>
        <p className="text-gray-300">|</p>
        {/* <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={editor?.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""}
          >
          purple
        </button> */}
        <Modal
          isOpen={isLinkModalOpen}
          setOpen={setIsLinkModalOpen}
          trigger={
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLinkModalOpen(true);
              }}
            >
              <Icon name="bf-i-ph-link"/>
            </button>
          }
          title="Please enter the URL"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => {
              e.preventDefault();
              setUrl(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (url) {
                editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                setIsLinkModalOpen(false);
                setUrl("");
              }
            }}
            className="btn-accent"
          >
            Add Link
          </button>
        </Modal>
        <Modal
          isOpen={isImageModalOpen}
          setOpen={setIsImageModalOpen}
          trigger={
            <button
              onClick={() => {
                setIsImageModalOpen(true);
              }}
            >
              <Icon name="bf-i-ph-image"/>
            </button>
          }
          title="Please select an image from storage or upload one"
        >
          <div className="flex flex-wrap">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-36 h-36 relative m-1 cursor-pointer ${
                  selectedImageIndex === index ? "border-2 border-accent-10" : ""
                }`}
                onClick={() => {
                  const imageName = image.substring(image.lastIndexOf("/") + 1);
                  setAltText(imageName);
                  setSelectedImage(image);
                  setSelectedImageIndex(index);
                }}
              >
                <NextImage src={image} alt={`Image ${index}`} width={200} height={200} className="rounded" />
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              setFile(e.target.files[0]);
              setAltText(e.target.files[0].name);
              const { data, error } = await supabase.storage
                .from("blog")
                .upload(`photo/${e.target.files[0].name}`, e.target.files[0]);
              if (data) {
                const url = `https://vancxkbrtcdpbjavbdbx.supabase.co/storage/v1/object/public/blog/photo/${e.target.files[0].name}`;
                // Add the new image to the images array
                setImages((prevImages) => [...prevImages, url]);
              } else {
                console.error("Upload error: ", error);
              }
            }}
          />
          <input type="text" placeholder="Alt text" value={altText} onChange={(e) => setAltText(e.target.value)} />
          <button
            onClick={() => {
              if (selectedImage) {
                editor.chain().focus().setImage({ src: selectedImage, alt: altText }).run();
                setIsImageModalOpen(false);
                setSelectedImage(null);
                setAltText("");
                setSelectedImageIndex(null);
              }
            }}
            className="btn-accent"
          >
            Select Image
          </button>
        </Modal>
        <Modal
          isOpen={isYouTubeModalOpen}
          setOpen={setIsYouTubeModalOpen}
          trigger={
            <button
              onClick={() => {
                setIsYouTubeModalOpen(true);
              }}
            >
              <Icon name="bf-i-ph-youtube-logo"/>
            </button>
          }
          title="Please enter a YouTube video URL"
        >
          <input
            type="text"
            placeholder="YouTube video URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
          />
          <button
            onClick={() => {
              if (youtubeUrl) {
                let videoId = youtubeUrl.split("v=")[1];
                const ampersandPosition = videoId.indexOf("&");
                if (ampersandPosition !== -1) {
                  videoId = videoId.substring(0, ampersandPosition);
                }
                editor
                  .chain()
                  .focus()
                  .setYouTube({ src: `https://www.youtube.com/embed/${videoId}` })
                  .run();
                setIsYouTubeModalOpen(false);
                setYoutubeUrl("");
              }
            }}
            className="btn-accent"
          >
            Insert Video
          </button>
        </Modal>
      </div>
      <EditorContent editor={editor} className="bg-white px-4 py-2 rounded border border-gray-300" />
    </div>
  );
};

export default Editor;
