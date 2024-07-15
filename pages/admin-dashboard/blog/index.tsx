import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { renderNoData } from "@/components/RenderQ";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import useAdminAccess from "@/hooks/useAdminAccess";
import { useEffect, useState } from "react";

const Blog = () => {
  const hasBlogManagementAccess = useAdminAccess("hasBlogManagementAccess");
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { locale } = router;

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const postQ = useQuery({
    queryKey: ["postAdminDash-1"],
    queryFn: async () => {
      const { data, error } = await supabase.from("post").select(`*`);
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (postQ.data) {
      setData(postQ.data);
    }
  }, [postQ.data]);

  useEffect(() => {
    if (data) {
      console.log('I am data of course!', data)
    }
  }, [data])

  const deleteMutation = useMutation(
    async (postId) => {
      const { error } = await supabase.from("post").delete().match({ id: postId });
      if (error) throw error;
    },
    {
      onSuccess: () => {
        toast.success("Post deleted successfully!");
        queryClient.invalidateQueries({ queryKey: ["postAdminDash-1"] });
      },
    }
  );

  if (!hasBlogManagementAccess) return <p>You don&apos;t have access to this page</p>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="rd-xl b-1 b-gray-6 bg-gray1 p-4 flex justify-end">
        <Link href="/admin-dashboard/blog/add" className="btn-accent bf-i-ph-plus">
          Add a new blog post
        </Link>
      </div>
      <div className="flex space-x-4 mt-4">
        <button
          className={`${activeTab === "all" ? "btn-accent" : "btn"}`}
          onClick={() => {
            setActiveTab("all");
            setData(postQ.data);
          }}
        >
          All
        </button>
        <button
          className={`${activeTab === "en" ? "btn-accent" : "btn"}`}
          onClick={() => {
            setActiveTab("en");
            setData(postQ.data.filter((post) => post.contentFa === null));
          }}
        >
          English
        </button>
        <button
          className={`${activeTab === "fa" ? "btn-accent" : "btn"}`}
          onClick={() => {
            setActiveTab("fa");
            setData(postQ.data.filter((post) => post.content === null));
          }}
        >
          Farsi
        </button>
      </div>
      {data &&
        data.map((post) => (
          <div
            key={post.id}
            className="block bg-white shadow-md hover:shadow-xl rounded-lg p-6 mb-4 transition duration-200 ease-in-out transform hover:scale-101"
          >
            {post.title && <h2 className="text-2xl font-bold mb-2">Title: {post.title}</h2>}
            {post.titleFa && <h2 className="text-2xl font-bold mb-2">عنوان: {post.titleFa}</h2>}
            <div className="mt-4">
              <Link href={`/admin-dashboard/blog/edit/${post.id}`} className="mie-4 text-accent-9 hover:text-accent-10">
                Edit
              </Link>
              <button onClick={() => deleteMutation.mutate(post.id)} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blog;
