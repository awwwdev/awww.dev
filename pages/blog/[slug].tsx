import { useRouter } from "next/router";
import { getFullName } from "@/utils/formatter";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import NextImage from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import YouTube from "@/components/YouTube";
import { En, Fa } from "@/components/ui/multilang";
import supabase from "@/utils/supabase";
import { DPost, DUser } from "@/types";
import Space from "@/components/ui/Space";

type PostType = DPost & { user: Pick<DUser, "firstname" | "lastname" | "firstnameFa" | "lastnameFa"> };

export async function getServerSideProps(context) {
  const { locale } = context;
  const { slug } = context.params;

  const { data, error }: any = await supabase
    .from("post")
    .select("*, author(firstname, lastname, firstnameFa, lastnameFa)")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Fetch post data error: ", error);
    return { props: {} };
  }

  const newViewCount = (data.viewCount || 0) + 1;

  const { error: updateError } = await supabase.from("post").update({ viewCount: newViewCount }).eq("slug", slug);

  if (updateError) {
    console.error("Update post view count error: ", updateError);
  }

  let post = null;

  if (locale === "fa" && data.contentFa !== null) {
    post = data;
  } else if (locale === "en" && data.content !== null) {
    post = data;
  }

  return {
    props: {
      initialPost: post,
    },
  };
}

const Post = ({ initialPost }: { initialPost: PostType }) => {
  const { locale } = useRouter();
  const [htmlContent, setHtmlContent] = useState("");

  const extensions = useMemo(() => {
    return [
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
  }, []);

  let content = "";
  if (locale === "fa") {
    content = initialPost?.contentFa;
  } else {
    content = initialPost?.content;
  }

  useEffect(() => {
    const editor = new Editor({
      extensions,
      content,
    });

    setHtmlContent(editor.getHTML());

    editor.destroy();
  }, [initialPost, content, extensions]);

  if (initialPost === null) {
    return (
      <div>
        <En>This article does not have English version.</En>
        <Fa>این مقاله دارای نسخهٔ فارسی نمی‌باشد.</Fa>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-50rem mx-auto">
        <Space size="h-6 " />
        <h1 className="H1 c-melow leading-normal">{locale === "en" ? initialPost.title : initialPost.titleFa}</h1>
        <p className="">
          {locale === "en" ? (
            <>
              <Space size="h-6 " />
              {initialPost.subtitle}
            </>
          ) : (
            <>
              <Space size="h-6 " />
              {initialPost.subtitleFa}
            </>
          )}
        </p>
        <Space size="h-8 " />
        <p className="c-sand11">
          <En></En>
          <Fa>
            نوشته شده بدست: {` `}
            {getFullName(initialPost.author)}
          </Fa>
        </p>
        <p className="c-sand11">
          <En>Number of Views: {initialPost.viewCount}</En>
          <Fa>
            {initialPost.viewCount}
            {` `}
            بازدید ‍{` `}
          </Fa>
        </p>
      </div>
      <Space size="h-4 " />
      <div className="max-w-70rem mx-auto">
        <NextImage
          src={initialPost.featuredImage ?? ""}
          alt={`${locale === "fa" ? initialPost.titleFa : initialPost.title}`}
          width={200}
          height={200}
          className={`rd-4  block bg-sand4 w-full max-w-70rem mx-auto  object-cover italic  text-center flex items-center justify-center c-sand10 shd-tinted-3`}
        />
      </div>
      <Space size="h-12" />

      <div className="max-w-50rem mx-auto">
        <div className="tiptap ProseMirror" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

export default Post;
