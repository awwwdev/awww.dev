import Modal from "../ui/modal";
import WorkItemCard from './WorkItemCard';
import WorkItemModalContent from './WorkItemModalContent';

export default function WorkItem({
  title,
  titleColor,
  gridRow,
  gridColumn,
  className = "",
  imgSrcs,
  imgs,
  subtitle,
  description,
  tools,
  categories,
  relatedBlogPost,
  gradient,
  borderColor,
  borderGradeintFrom
}) {
  return (
    <li className={`${gridRow} ${gridColumn} `}>
      <Modal
        trigger={
          <button type="button" className="h-full w-full text-left rd-3" aria-label='Open Work Details'>
            <WorkItemCard {...{ title, titleColor, subtitle, className, imgSrcs, gradient, borderColor, imgs, borderGradeintFrom }} />
          </button>
        }
      >
        <WorkItemModalContent {...{ title, description, subtitle, relatedBlogPost, tools, imgSrcs , imgs }} />
      </Modal>
    </li>
  );
}






