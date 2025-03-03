import Link from "next/link";

interface BreadcrumbProps {
  pageName: string;
  backPageRoute: string;
  backPageName: string;
}

const Breadcrumb = ({ pageName, backPageName, backPageRoute }: BreadcrumbProps) => {
  return (
    <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h4 className="text-[20px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName}
      </h4>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href={backPageRoute}>
              {backPageName} /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
