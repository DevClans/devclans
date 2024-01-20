import { PageProps } from "@/types/page.types";
import { ButtonConnect, ButtonSecondary, ChipGroup } from "..";
import Link from "next/link";

type ItemsTemplateProps = Partial<PageProps> & {
  img: JSX.Element;
  detailsHeader?: JSX.Element;
  rightMessage: JSX.Element;
  detailHeading?: string;
  detailDesc?: string;
  chipArr: string[];
  baseUrl: string;
  _id: string;
  desc: string;
  title?: string;
};
// built using projectItem as a template for now to build out the new list items
const ItemsTemplate = ({
  searchParams,
  img,
  detailsHeader,
  rightMessage,
  detailHeading,
  detailDesc,
  chipArr,
  baseUrl,
  _id,
  desc,
  title,
}: ItemsTemplateProps) => {
  const url = `${baseUrl}${_id}`;
  return (
    <>
      <div className="lg:frfssb fcc relative p-2 h-max min-h-[200px] gap-5 w100 card2">
        {/* IMAGE */}
        {img}
        {/* DETAILS */}
        <div className="fcfs gap-2 w100">
          {detailsHeader && <div className="frcsb w100">{detailsHeader}</div>}
          {title && (
            <Link href={url}>
              <h2>{title}</h2>
            </Link>
          )}
          <p>
            {desc ||
              "Some cool description about the group. Some cool description about the group."}
            {".."}
            <Link className="text-priDarker font-medium" href={baseUrl + _id}>
              {" "}
              Read More
            </Link>
          </p>
          {Boolean(detailDesc && detailHeading) && (
            <div className="frc gap-1">
              <p>{detailHeading}</p>
              <p className="text-highlight font-medium">
                {detailDesc || "team names"}
              </p>
            </div>
          )}
          <ChipGroup arr={chipArr || []} searchParams={searchParams} />
        </div>
        {/* CONTACT AND CALL TO ACTIONS */}
        <div className="fcfssb h-full lg:min-h-[200px] lg:border-l border-t lg:border-t-0 pt-2 gap-2 lg:pt-0 border-border lg:pl-5 lg:max-w-[222px] w100 ">
          {/* need people */}
          {rightMessage || "Learn something new about me. Visit my profile!"}
          {/* buttons */}
          <div className="fcc w100 gap-2">
            <ButtonSecondary href={url} label={"View Project"} />
            <ButtonConnect label={"Chat With Team"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsTemplate;
