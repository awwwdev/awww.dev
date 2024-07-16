import Icon from '@/components/ui/Icon';

export default function StarRating({ number = 0, className }: { number: number; className?: string }) {
  if (number > 5 || number < 0) return <></>;

  const rate = Math.round(number * 2) / 2;
    return (
      <div className={`flex gap-1 items-center c-brand-accent ${className} `}>
        <StarIcons number={rate} />
      </div>
    );
}


function StarIcons({number}){

  return (
    <>
        {number >= 1 && <Icon name="bf-i-ph-star-fill" subdued={false}/>}
        {number >= 2 && <Icon name="bf-i-ph-star-fill" subdued={false}/>}
        {number >= 3 && <Icon name="bf-i-ph-star-fill" subdued={false}/>}
        {number >= 4 && <Icon name="bf-i-ph-star-fill" subdued={false}/>}
        {number === 5 && <Icon name="bf-i-ph-star-fill" subdued={false}/>}
        {number % 1 === 0.5 && <Icon name="bf-i-ph-star-half-fill" subdued={false}/>}
        {number <= 4 && <Icon name="bf-i-ph-star" subdued={false}/>}
        {number <= 3 && <Icon name="bf-i-ph-star" subdued={false}/>}
        {number <= 2 && <Icon name="bf-i-ph-star" subdued={false}/>}
        {number <= 1 && <Icon name="bf-i-ph-star" subdued={false}/>}
        {number === 0 && <Icon name="bf-i-ph-star" subdued={false}/>}
    </>
  );
};