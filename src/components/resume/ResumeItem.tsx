type ResumeItemProps = {
  title: string;
  subtitle?: string;
  dateRange?: string;
  description?: string;
};

export default function ResumeItem({
  title,
  subtitle,
  dateRange,
  description
}: ResumeItemProps): JSX.Element {
  return (
    <div className='text-gray-800 dark:text-gray-200'>
      <h3 className='font-medium'>{title}</h3>
      {subtitle && <p className='text-sm italic'>{subtitle}</p>}
      {dateRange && <p className='text-sm text-gray-500'>{dateRange}</p>}
      {description && <p className='text-sm mt-1'>{description}</p>}
    </div>
  );
}
