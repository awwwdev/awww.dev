import { StaticImageData } from "next/image";
import Modal from "../ui/modal";
import WorkItemCard from "./WorkItemCard";
import WorkItemModalContent from "./WorkItemModalContent";
import { Post } from "@/lib/api";

type Category = 'UI Design' | 'Front End' | 'Back End';

type Props = {
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  imgs: StaticImageData[];
  gridRow: string;
  gridColumn: string;
  className?: string;
  gradient: string;
  borderColor?: string;
  borderGradeintFrom: string;
  borderGradeintTo?: string;
  relatedBlogPost?: Post;
  whatIDid: string[],
  categories?: Category[],
  linkToProject?: string
};

export default function WorkItem({
  title,
  gridRow,
  gridColumn,
  className = "",
  imgs,
  subtitle,
  description,
  tools,
  relatedBlogPost,
  gradient,
  borderColor,
  borderGradeintFrom,
  borderGradeintTo,
  whatIDid,
  categories,
  linkToProject
}: Props) {
  return (
    <li className={`${gridRow} ${gridColumn} `}>
      <Modal
        trigger={
          <button type="button" className="h-full w-full text-left rd-3" aria-label="Open Work Details">
            <WorkItemCard {...{ title, subtitle, className, gradient, borderColor, imgs, borderGradeintFrom, borderGradeintTo }} />
          </button>
        }
      >
        <WorkItemModalContent {...{ title, description, subtitle, relatedBlogPost, tools, imgs, whatIDid, categories, linkToProject }} />
      </Modal>
    </li>
  );
}
