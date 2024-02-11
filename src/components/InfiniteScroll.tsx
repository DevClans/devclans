"use client";
import { MoveLeft, MoveRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IconWithBg } from ".";
import colors from "@/lib/colors";

// this can be a server comp but is client comp for future infinite scroll
const InfiniteScroll = ({ itemsCount }: { itemsCount: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const newParams = new URLSearchParams(searchParams);
  const page = parseInt(newParams.get("page") || "1");
  const [hasMore, setHasMore] = useState(false);
  const handlePageChange = (increment: number) => {
    const newPage = page + increment;
    if (page < 1 || newPage > 10 || (increment > 0 && !hasMore)) {
      console.log("cant change page");
      return;
    }
    newParams.set("page", newPage.toString());
    router.push(pathname + "?" + newParams.toString());
  };
  //   * infinite scroll
  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const { scrollTop, scrollHeight, clientHeight } =
  //         document.documentElement;
  //       if (scrollTop + clientHeight >= scrollHeight - 100) {
  //         console.log("bottom", hasMore, page, itemsCount);
  //         setLoading(true);
  //       }
  //     };
  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);
  useEffect(() => {
    // count == page * 20 then set hasMore to true else false
    console.log("checking if can get more", itemsCount, page);
    if (itemsCount === page * 20) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [itemsCount, page]);
  //   useEffect(() => {
  //     if (loading && hasMore) {
  //       console.log("loading", loading, hasMore, page, itemsCount);
  //       // fetch more data
  //       newParams.set("page", (page + 1).toString());
  //       setLoading(false);
  //       router.push(pathname + "?" + newParams.toString());
  //     }
  //   }, [loading, hasMore]);
  if (page == 1 && !hasMore) {
    return null;
  }
  return (
    <div className="w100 fcc">
      <div className="frc gap-2">
        <IconWithBg
          disabled={page === 1}
          title="previous page"
          onClick={() => {
            handlePageChange(-1);
          }}
        >
          <MoveLeft color={colors.subH} size={14} />
        </IconWithBg>
        <h3 className="text-subH"> {page}</h3>
        <IconWithBg
          disabled={!hasMore}
          title="next page"
          onClick={() => {
            handlePageChange(1);
          }}
        >
          <MoveRight color={colors.subH} size={14} />
        </IconWithBg>
      </div>
    </div>
  );
};

export default InfiniteScroll;
