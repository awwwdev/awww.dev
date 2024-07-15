import React, { useEffect, useRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from 'next/image'
import useGetUserMe from "@/hooks/useGetUserMe";
import toast from "react-hot-toast";
import useAdminAccess from "@/hooks/useAdminAccess";
import Editor from "@/components/Editor";
import Modal from "@/components/ui/modal";

function CreatePostForm() {
  const hasBlogManagementAccess = useAdminAccess("hasBlogManagementAccess");

  const supabase = useSupabaseClient();
  const userMeQ = useGetUserMe();
  const [activeTab, setActiveTab] = useState("en");
  const [slug, setSlug] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [titleFa, setTitleFa] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [subtitleFa, setSubtitleFa] = useState("");
  const [editorContent, setEditorContent] = useState(null);
  const [editorContentFa, setEditorContentFa] = useState(null);
  const editorRef = useRef(null);
  const editorFaRef = useRef(null);

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
  }, [isImageModalOpen ,  supabase.storage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(editorContent);
    console.log(editorContentFa);
    const now = new Date();
    const dateTimeString = now.toISOString().substring(0, 16);
    const post = {
      slug,
      featuredImage,
      title: title ? title : null,
      subtitle: subtitle ? subtitle : null,
      titleFa: titleFa ? titleFa : null,
      subtitleFa: subtitleFa ? subtitleFa : null,
      date: dateTimeString,
      author: userMeQ?.data.admin.id,
      content: editorContent ? editorContent : null,
      contentFa: editorContentFa ? editorContentFa : null,
    };
    if (editorRef.current) {
      editorRef.current.commands.setContent("");
    }
    const { data, error } = await supabase.from("post").insert(post).select();
    if (error) {
      throw new Error(error.message);
    } else {
      toast.success("Post created successfully!");
      setTitle("");
      setSlug("");
      if (editorRef.current) {
        editorRef.current.commands.setContent("");
      }
      if (editorFaRef.current) {
        editorRef.current.commands.setContent("");
      }
    }
  };

  if (!hasBlogManagementAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded"
        placeholder="Slug"
        required
      />
      <input
        type="text"
        name="featuredImage"
        value={featuredImage}
        onClick={() => setIsImageModalOpen(true)}
        readOnly
        className="w-full px-3 py-2 border border-gray-300 rounded"
        placeholder="FeaturedImage"
        required
      />
      <Modal
        isOpen={isImageModalOpen}
        setOpen={setIsImageModalOpen}
        title="Please select an image from storage or upload one"
      >
        <div className="flex flex-wrap">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-36 h-36 relative m-1 cursor-pointer ${
                selectedImageIndex === index ? "border-2 border-prm-10" : ""
              }`}
              onClick={() => {
                const imageName = image.substring(image.lastIndexOf("/") + 1);
                setSelectedImage(image);
                setSelectedImageIndex(index);
              }}
            >
              <Image src={image} alt={`Image ${index}`} width={200} height={200} className="rounded" />
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
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
        <button
          onClick={() => {
            if (selectedImage) {
              setFeaturedImage(selectedImage);
              setIsImageModalOpen(false);
              setSelectedImage(null);
              setSelectedImageIndex(null);
            }
          }}
          className="btn-prm"
        >
          Select Image
        </button>
      </Modal>
      <button
        className={`px-4 py-2 rounded-md text-white ${activeTab === "en" ? "bg-prm9" : "bg-gray-500"}`}
        onClick={(e) => {
          e.preventDefault();
          setActiveTab("en");
        }}
      >
        En
      </button>
      <button
        className={`px-4 py-2 rounded-md text-white mis-2 ${activeTab === "fa" ? "bg-prm9" : "bg-gray-500"}`}
        onClick={(e) => {
          e.preventDefault();
          setActiveTab("fa");
        }}
      >
        Fa
      </button>
      <div className={`${activeTab === "en" ? "hidden" : ""}`}>
        <input
          type="text"
          name="titleFa"
          value={titleFa}
          onChange={(e) => setTitleFa(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Title in Farsi"
        />
        <input
          type="text"
          name="subtitleFa"
          value={subtitleFa}
          onChange={(e) => setSubtitleFa(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Subtitle in Farsi"
        />
        <Editor
          content=""
          onContentChange={setEditorContentFa}
          onEditorReady={(editor) => {
            editorFaRef.current = editor;
          }}
          direction="rtl"
        />
      </div>
      <div className={`${activeTab === "fa" ? "hidden" : ""}`}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Title"
        />
        <input
          type="text"
          name="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Subtitle"
        />
        <Editor
          content=""
          onContentChange={setEditorContent}
          onEditorReady={(editor) => {
            editorRef.current = editor;
          }}
          direction="ltr"
        />
      </div>
      <button type="submit" className="btn-prm">
        Create Post
      </button>
    </form>
  );
}

export default CreatePostForm;
