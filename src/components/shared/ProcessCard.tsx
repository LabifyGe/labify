type ProcessCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function ProcessCard({
  description,
  icon,
  title,
}: ProcessCardProps) {
  const Icon = icon;
  return (
    <li className="flex flex-col gap-1">
      <div className="mb-1">
        <Icon className=" text-5xl" />
      </div>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </li>
  );
}
