import React, { useEffect, useRef, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import toast from "react-hot-toast";
import useAdminAccess from "@/hooks/useAdminAccess";
import Editor from "@/components/Editor";
import Modal from "@/components/ui/modal";
import supabase from "@/utils/supabase";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { data, error } = await supabase.from("post").select("*").eq("id", id).single();

  if (error) {
    console.error("Fetch post data error: ", error);
    return { props: {} };
  }

  const post = data;

  return {
    props: {
      initialPost: post,
    },
  };
}

function EditPostForm({ initialPost }) {
  const hasBlogManagementAccess = useAdminAccess("hasBlogManagementAccess");
  const supabase = useSupabaseClient();
  const [slug, setSlug] = useState(initialPost.slug);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState(initialPost.featuredImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [title, setTitle] = useState(initialPost.title);
  const [titleFa, setTitleFa] = useState(initialPost.titleFa);
  const [subtitle, setSubtitle] = useState(initialPost.subtitle);
  const [subtitleFa, setSubtitleFa] = useState(initialPost.subtitleFa);
  const [activeTab, setActiveTab] = useState("en");
  const [editorContent, setEditorContent] = useState(initialPost.content);
  const [editorContentFa, setEditorContentFa] = useState(initialPost.contentFa);
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
  }, [isImageModalOpen, supabase.storage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const post = {
      slug,
      featuredImage,
      title,
      subtitle,
      titleFa,
      subtitleFa,
      content: editorContent,
      contentFa: editorContentFa,
    };
    const { data, error } = await supabase.from("post").update(post).eq("id", initialPost.id).select();
    if (error) {
      throw new Error(error.message);
    } else {
      toast.success("Post updated successfully!");
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
          content={initialPost.contentFa}
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
          content={initialPost.content}
          onContentChange={setEditorContent}
          onEditorReady={(editor) => {
            editorRef.current = editor;
          }}
          direction="ltr"
        />
      </div>
      <button type="submit" className="btn-prm">
        Update Post
      </button>
    </form>
  );
}

export default EditPostForm;
